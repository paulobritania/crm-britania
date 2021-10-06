import {
  Injectable,
  Inject,
  BadRequestException,
  InternalServerErrorException,
  HttpException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'

import { Access } from '../accesses/entities/access.entity'
import { Field } from '../fields/entities/field.entity'
import { Permission } from '../permissions/entities/permission.entity'
import { User } from '../users/entities/user.entity'
import { UserProfile } from '../users/entities/userProfile.entity'
import { WorkflowTask } from '../workflows/entities/workflowTask.entity'
import { CreateProfileDto } from './dto/createProfile.dto'
import { SearchProfileAutocompleteDto } from './dto/search-autocomplete.dto'
import { UpdateProfileDto } from './dto/updateProfile.dto'
import { Profile } from './entities/profile.entity'
import { ProfileAccess } from './entities/profileAccess.entity'
import { ProfileAccessException } from './entities/profileAccessException.entity'
import { ProfileMicro } from './entities/profileMicro.entity'
import { ProfilePermission } from './entities/profilePermission.entity'

@Injectable()
export class ProfilesService {
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(Profile) private profileModel: typeof Profile,
    @InjectModel(ProfilePermission)
    private profilePermissionModel: typeof ProfilePermission,
    @InjectModel(Access) private accessModel: typeof Access,
    @InjectModel(Permission) private permissionModel: typeof Permission,
    @InjectModel(ProfileAccess)
    private profileAccessModel: typeof ProfileAccess,
    @InjectModel(ProfileMicro) private profileMicroModel: typeof ProfileMicro,
    @InjectModel(Field) private fieldModel: typeof Field,
    @InjectModel(ProfileAccessException)
    private profileAccessExceptionModel: typeof ProfileAccessException,
    @InjectModel(UserProfile) private userProfileModel: typeof UserProfile,
    @InjectModel(User) private userModel: typeof User
  ) {}

  /**
   * Lista todas os perfis
   */
  async findAll(query: SearchProfileAutocompleteDto): Promise<Profile[]> {
    const { name, limit, offset } = query
    let fullQuery = {}

    if (name) {
      fullQuery = {
        ...fullQuery,
        where: {
          $or: {
            name: { $like: `%${ name }%` }
          }
        }
      }
    }

    if (limit) {
      const parsedLimit = parseInt(limit, 10)
      fullQuery = { ...fullQuery, limit: parsedLimit }
    }

    if (offset) {
      const parsedOffset = parseInt(offset, 10)
      fullQuery = { ...fullQuery, offset: parsedOffset }
    }

    return this.profileModel.findAll(fullQuery)
  }

  /**
   * Busca um perfil e o retorna
   * @param id number
   */
  async findById(id: number): Promise<Profile> {
    return this.profileModel.findOne({
      where: {
        id
      },
      include: [
        {
          model: this.profilePermissionModel,
          include: [
            { model: this.permissionModel, attributes: ['id', 'name', 'alias'] }
          ]
        },
        {
          model: this.profileAccessModel,
          include: [
            { model: this.accessModel, attributes: ['id', 'name', 'alias'] }
          ]
        },
        {
          model: this.profileMicroModel,
          include: [
            {
              model: this.fieldModel,
              attributes: ['id', 'accessId', 'name', 'alias'],
              include: [
                { model: this.accessModel, attributes: ['id', 'name', 'alias'] }
              ]
            }
          ]
        },
        {
          model: this.profileAccessExceptionModel,
          include: [
            {
              model: this.permissionModel,
              attributes: ['id', 'name', 'alias']
            },
            { model: this.accessModel, attributes: ['id', 'name', 'alias'] }
          ]
        },
        {
          model: this.userProfileModel,
          include: [
            {
              model: this.userModel,
              where: {
                deleted_at: null
              }
            }
          ]
        }
      ]
    })
  }

  /**
   * Cria um perfil e retorna seu ID
   * @param data CreateProfileDto
   * @param userId number
   */
  async create(data: CreateProfileDto, userId: number): Promise<number> {
    const transaction = await this.db.transaction()

    try {
      const profileData = {
        name: data.name,
        active: data.active
      }
      const newProfile = await this.profileModel.create(profileData, {
        transaction
      })

      const profileLog = {
        newData: newProfile.get({ plain: true }),
        oldData: null,
        userId,
        httpVerb: 'create',
        table: 'profiles'
      }
      this.logsClient.send({ log: 'create' }, profileLog).toPromise()

      await Promise.all(
        data.permissions.map((permission) => {
          const profilePermissionData = {
            profileId: newProfile.id,
            permissionId: permission
          }
          return this.profilePermissionModel.create(
            { ...profilePermissionData },
            { transaction }
          )
        })
      )

      await Promise.all(
        data.access.map((access) => {
          const profileAccessData = {
            profileId: newProfile.id,
            accessId: access
          }
          return this.profileAccessModel.create(
            { ...profileAccessData },
            { transaction }
          )
        })
      )

      if (Array.isArray(data.micros) && data.micros.length) {
        await Promise.all(
          data.micros.map((micro) => {
            const profileMicroData = {
              profileId: newProfile.id,
              fieldId: micro
            }
            return this.profileMicroModel.create(
              { ...profileMicroData },
              { transaction }
            )
          })
        )
      }

      if (Array.isArray(data.exceptions) && data.exceptions.length) {
        await Promise.all(
          data.exceptions.map((exception) => {
            const profileAccessExceptionData = {
              profileId: newProfile.id,
              permissionId: exception.permission,
              accessId: exception.access
            }
            return this.profileAccessExceptionModel.create(
              { ...profileAccessExceptionData },
              { transaction }
            )
          })
        )
      }

      if (Array.isArray(data.users) && data.users.length) {
        await Promise.all(
          data.users.map((user) => {
            const userProfileData = {
              userId: user,
              profileId: newProfile.id,
              createdBy: userId
            }
            return this.userProfileModel.create(
              { ...userProfileData },
              { transaction }
            )
          })
        )
      }

      await transaction.commit()
      return newProfile.id
    } catch (error) {
      await transaction.rollback()
      throw new InternalServerErrorException(
        'Ocorreu um erro ao criar o perfil'
      )
    }
  }

  /**
   * Atualiza um perfil e o retorna atualizado
   * @param profileId number
   * @param data UpdateProfileDto
   * @param userId number
   */
  async update(
    profileId: number,
    data: UpdateProfileDto,
    userId: number
  ): Promise<Profile> {
    const transaction = await this.db.transaction()
    let profile = null
    try {
      profile = await this.profileModel.findByPk(profileId)

      if (!profile) {
        throw new BadRequestException('Perfil não encontrado')
      }

      const profileData = {
        name: data.name,
        active: data.active
      }

      await this.profileModel.update(profileData, { where: { id: profileId } })

      await this.profilePermissionModel.destroy({
        where: { profileId },
        transaction
      })

      await this.profileAccessModel.destroy({
        where: { profileId },
        transaction
      })

      await this.profileMicroModel.destroy({
        where: { profileId },
        transaction
      })

      await this.profileAccessExceptionModel.destroy({
        where: { profileId },
        transaction
      })

      await this.userProfileModel.destroy({ where: { profileId }, transaction })

      await Promise.all(
        data.permissions.map((permission) => {
          const profilePermissionData = {
            profileId,
            permissionId: permission
          }
          return this.profilePermissionModel.create(
            { ...profilePermissionData },
            { transaction }
          )
        })
      )

      await Promise.all(
        data.access.map((access) => {
          const profileAccessData = {
            profileId,
            accessId: access
          }
          return this.profileAccessModel.create(
            { ...profileAccessData },
            { transaction }
          )
        })
      )

      if (Array.isArray(data.micros) && data.micros.length) {
        await Promise.all(
          data.micros.map((micro) => {
            const profileMicroData = {
              profileId,
              fieldId: micro
            }
            return this.profileMicroModel.create(
              { ...profileMicroData },
              { transaction }
            )
          })
        )
      }

      if (Array.isArray(data.exceptions) && data.exceptions.length) {
        await Promise.all(
          data.exceptions.map((exception) => {
            const profileAccessExceptionData = {
              profileId,
              permissionId: exception.permission,
              accessId: exception.access
            }
            return this.profileAccessExceptionModel.create(
              { ...profileAccessExceptionData },
              { transaction }
            )
          })
        )
      }

      if (Array.isArray(data.users) && data.users.length) {
        await Promise.all(
          data.users.map((user) => {
            const userProfileData = {
              userId: user,
              profileId,
              deleted_at: null,
              createdBy: userId
            }
            return this.userProfileModel.upsert(
              { ...userProfileData },
              { transaction }
            )
          })
        )
      }

      const log = {
        newData: data,
        oldData: profile.get({ plain: true }),
        userId,
        httpVerb: 'put',
        table: 'profiles'
      }

      this.logsClient.send({ log: 'create' }, log).toPromise()
      profile = await profile.reload()

      await transaction.commit()
      return profile
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o perfil'
      )
    }
  }

  /**
   * Atualiza o status de um perfil
   * @param profileId number
   */
  async updateStatus(profileId: number): Promise<Profile> {
    const transaction = await this.db.transaction()
    try {
      const profile = await this.profileModel.findByPk(profileId)

      if (!profile) throw new BadRequestException('Perfil não encontrado')

      const [, [newProfile]] = await this.profileModel.update(
        { active: !profile.active },
        { where: { id: profileId }, transaction, returning: true }
      )
      await transaction.commit()
      return newProfile
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar status do perfil'
      )
    }
  }

  /**
   * Exclui um perfil
   * @param profileId number
   * @param userId number
   */
  async delete(profileId: number, userId: number): Promise<void> {
    const transaction = await this.db.transaction()

    try {
      const profile = await this.profileModel.findByPk(profileId, {
        include: [{ model: WorkflowTask, attributes: ['id'] }]
      })

      if (!profile) throw new BadRequestException('Perfil não encontrado')
      if (profile.workflowTasks?.length)
        throw new BadRequestException(
          'Não é possível deletar o perfil pois o mesmo está atrelado a uma ou mais tarefas de fluxo de trabalho'
        )

      const log = {
        oldData: profile.get({ plain: true }),
        userId,
        httpVerb: 'delete',
        table: 'profiles'
      }

      const exceptions = await this.profileAccessExceptionModel.findAll({
        where: { profileId }
      })
      if (exceptions && exceptions.length) {
        await this.profileAccessExceptionModel.destroy({
          where: { profileId },
          transaction
        })
      }

      const micros = await this.profileMicroModel.findAll({
        where: { profileId }
      })
      if (micros && micros.length) {
        await this.profileMicroModel.destroy({
          where: { profileId },
          transaction
        })
      }

      const accesses = await this.profileAccessModel.findAll({
        where: { profileId }
      })
      if (accesses && accesses.length) {
        await this.profileAccessModel.destroy({
          where: { profileId },
          transaction
        })
      }

      const permissions = await this.profilePermissionModel.findAll({
        where: { profileId }
      })
      if (permissions && permissions.length) {
        await this.profilePermissionModel.destroy({
          where: { profileId },
          transaction
        })
      }

      const users = await this.userProfileModel.findAll({
        where: { profileId }
      })
      if (users && users.length) {
        await this.userProfileModel.destroy({
          where: { profileId },
          transaction
        })
      }

      await profile.destroy({ transaction })
      this.logsClient.send({ log: 'create' }, log).toPromise()

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException('Erro ao remover o perfil')
    }
  }
}
