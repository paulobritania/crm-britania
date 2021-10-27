/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BadRequestException,
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { Transaction, literal } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { QueryUtilsDto } from '../../utils/dto/queryUtils'
import { Access } from '../accesses/entities/access.entity'
import { Field } from '../fields/entities/field.entity'
import { File } from '../files/entities/file.entity'
import { UserRegionalManagerDto } from '../hierarchy/dtos/userRegionalManager.dto'
import { UserRegionalManagersQuery } from '../hierarchy/dtos/userRegionalManagersQuery.dto'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { HierarchyService } from '../hierarchy/hierarchy.service'
import { Permission } from '../permissions/entities/permission.entity'
import { Profile } from '../profiles/entities/profile.entity'
import { ProfileAccess } from '../profiles/entities/profileAccess.entity'
import { ProfileAccessException } from '../profiles/entities/profileAccessException.entity'
import { ProfileMicro } from '../profiles/entities/profileMicro.entity'
import { ProfilePermission } from '../profiles/entities/profilePermission.entity'
import { RepresentativeDto } from '../representatives/dtos/representative.dto'
import { RepresentativeQueryStringDto } from '../representatives/dtos/representativesQueryString'
import { RepresentativesService } from '../representatives/representatives.service'
import { GetUserProfilesDetailsResponseDto } from './dto/getUserProfilesDetailsResponse.dto'
import { GetUserProfilesResponseDto } from './dto/getUserProfilesResponse.dto'
import { UserAutocompleteResponseDto } from './dto/user.autocomplete.response.dto'
import { UserAutocompleteSearchDto } from './dto/user.autocomplete.search.dto'
import { UserDto } from './dto/user.dto'
import { CreateUserDto } from './dto/userCreate.dto'
import { UpdateUserProfilesDto } from './dto/userProfiles.dto'
import { UpdateUserDto } from './dto/userUpdate.dto'
import { User } from './entities/user.entity'
import { UserProfile } from './entities/userProfile.entity'
import { UserRepresentativeCode } from './entities/userRepresentativeCode.entity'

const moment = require('moment-timezone')
@Injectable()
export class UsersService {
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(RepresentativesService)
    private readonly representativesService: RepresentativesService,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(UserRepresentativeCode)
    private userRepresentativeCode: typeof UserRepresentativeCode,
    @InjectModel(UserProfile) private userProfile: typeof UserProfile,
    @InjectModel(Profile) private profile: typeof Profile,
    @InjectModel(Hierarchy)
    private readonly hierarchyModel: typeof Hierarchy,
    @Inject(HierarchyService)
    private readonly hierarchyService: HierarchyService
  ) {}

  /**
   * Lista os usuários via pesquisa de autocomplete
   * @param query UserAutocompleteSearchDto
   */
  async autocomplete(
    query: UserAutocompleteSearchDto
  ): Promise<UserAutocompleteResponseDto[]> {
    const users = await this.userModel.findAll({
      where: { ...(query.name && { username: { $like: `%${ query.name }%` } }) },
      attributes: ['id', 'username']
    })
    return users.map((user) => ({ id: user.id, name: user.username }))
  }

  /**
   * Cria um usuário e retorna seu ID
   * @param data CreateUserDto
   * @param loggedUserId number
   */
  async create(data: CreateUserDto, loggedUserId: number): Promise<number> {
    const transaction = await this.db.transaction()

    try {
      const {
        representativeCodes,
        profiles,
        substituteUserStartDate,
        substituteUserEndDate,
        ...user
      } = data
      const exists = await this.userModel.findOne({
        where: { username: user.username }
      })
      const newUser = {
        ...user,
        substituteUserStartDate: substituteUserStartDate
          ? moment(substituteUserStartDate)
              .tz('America/Sao_Paulo')
              .startOf('day')
              .utc()
          : null,
        substituteUserEndDate: substituteUserEndDate
          ? moment(substituteUserEndDate)
              .tz('America/Sao_Paulo')
              .endOf('day')
              .utc()
          : null,
        createdBy: loggedUserId
      }

      if (exists)
        throw new ConflictException('Já existe um usuário com o nome informado')

      const resource = await this.userModel.create(newUser, { transaction })

      if (Array.isArray(representativeCodes)) {
        await Promise.all(
          representativeCodes.map((code) =>
            this.userRepresentativeCode.create(
              { userId: resource.id, code },
              { transaction }
            )
          )
        )
      }

      await this.updateUserProfiles(
        resource.id,
        { profiles },
        loggedUserId,
        transaction
      )

      const log = {
        newData: resource.get({ plain: true }),
        oldData: null,
        userId: loggedUserId,
        httpVerb: 'create',
        table: 'users'
      }

      this.logsClient.send({ log: 'create' }, log).toPromise()
      await transaction.commit()

      return resource.id
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao cadastrar o usuário'
      )
    }
  }

  /**
   * Exclui um usuário
   * @param id number
   * @param loggedUserId number
   */
  async delete(id: number, loggedUserId: number): Promise<void> {
    const transaction = await this.db.transaction()

    try {
      const resource = await this.userModel.findByPk(id)

      if (!resource) throw new BadRequestException('Usuário não encontrado')

      const log = {
        oldData: resource.get({ plain: true }),
        userId: loggedUserId,
        httpVerb: 'delete',
        table: 'invoices'
      }

      await resource.destroy({ transaction })
      await this.userRepresentativeCode.destroy({
        where: { userId: id },
        transaction
      })
      this.logsClient.send({ log: 'create' }, log).toPromise()

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error
      throw new InternalServerErrorException(
        'Ocorreu um erro ao remover o usuário'
      )
    }
  }

  /**
   * Lista todos os usuários
   * @param query QueryUtilsDto
   */
  async findAll(query: QueryUtilsDto): Promise<UserDto[]> {
    const { limit, offset } = query
    let where = {}

    if (limit) {
      where = { ...where, limit }
    }

    if (offset) {
      where = { ...where, offset }
    }

    const users = await this.userModel.findAll({
      attributes: [
        'id',
        'imageId',
        'username',
        'email',
        'phone',
        'customerHierarchyEnabled',
        'substituteUserId',
        'substituteUserStartDate',
        'substituteUserEndDate',
        'isActive'
      ],
      where,
      include: [
        {
          model: UserProfile,
          attributes: ['profileId'],
          include: [{ model: Profile, attributes: ['name'] }]
        },
        {
          model: UserRepresentativeCode,
          attributes: ['code']
        },
        {
          model: File,
          attributes: ['id', 'filename', 'contentType', 'path']
        },
        {
          model: User,
          as: 'substituteUser',
          association: 'substituteUser',
          attributes: ['id', 'username']
        }
      ]
    })

    return users.map((usr) => {
      const user = usr.toJSON() as User

      const formattedUserProfiles =
        user.userProfiles &&
        user.userProfiles.map((userProfile) => ({
          profileId: userProfile.profileId,
          name: userProfile.profile.name
        }))

      const formattedUserRepresentativeCodes =
        user.representativeCodes &&
        user.representativeCodes.map(({ code }) => ({ code }))

      return {
        ...user,
        userProfiles: formattedUserProfiles || [],
        representativeCodes: formattedUserRepresentativeCodes || []
      } as UserDto
    })
  }

  /**
   * Atualiza um usuário e o retorna
   * @param id number
   * @param data UpdateUserDto
   * @param loggedUserId number
   */
  async update(
    id: number,
    data: UpdateUserDto,
    loggedUserId: number
  ): Promise<User> {
    let resource = null
    const transaction = await this.db.transaction()

    try {
      resource = await this.userModel.findByPk(id)

      if (!resource) throw new BadRequestException('Usuário não encontrado')

      const {
        representativeCodes,
        profiles,
        substituteUserStartDate,
        substituteUserEndDate,
        ...user
      } = data

      const formattedUser = {
        ...user,
        substituteUserStartDate: substituteUserStartDate
          ? moment(substituteUserStartDate)
              .tz('America/Sao_Paulo')
              .startOf('day')
              .utc()
          : null,
        substituteUserEndDate: substituteUserEndDate
          ? moment(substituteUserEndDate)
              .tz('America/Sao_Paulo')
              .endOf('day')
              .utc()
          : null,
        updatedBy: loggedUserId
      }

      await this.userModel.update(formattedUser, { where: { id } })
      await this.userRepresentativeCode.destroy({
        where: { userId: resource.id },
        transaction
      })

      if (Array.isArray(representativeCodes)) {
        await Promise.all(
          representativeCodes.map((code) =>
            this.userRepresentativeCode.create(
              { userId: resource.id, code },
              { transaction }
            )
          )
        )
      }

      await this.updateUserProfiles(
        resource.id,
        { profiles },
        loggedUserId,
        transaction
      )

      const log = {
        newData: data,
        oldData: resource.get({ plain: true }),
        userId: loggedUserId,
        httpVerb: 'patch',
        table: 'invoices'
      }

      this.logsClient.send({ log: 'create' }, log).toPromise()
      resource = await resource.reload()
      await transaction.commit()

      return resource
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error
      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o usuário'
      )
    }
  }

  /**
   * Busca um usuário pelo seu username
   * @param username string
   */
  async findByUsername(username: string): Promise<User> {
    const where = {
      username,
      isActive: true
    }

    return this.userModel.findOne({ where, attributes: ['id'] })
  }

  /**
   * Atualiza os perfis de um usuário
   * @param id number
   * @param data UpdateUserProfilesDto
   * @param loggedUserId number
   */
  async updateUserProfiles(
    id: number,
    data: UpdateUserProfilesDto,
    loggedUserId: number,
    trx?: Transaction
  ): Promise<void> {
    const transaction = trx || (await this.db.transaction())

    let { profiles } = data

    try {
      const resource = await this.userModel.findByPk(id, { transaction })
      const oldData = await this.userProfile.findAll({
        where: { userId: id },
        transaction
      })

      profiles = profiles.filter((item, pos) => profiles.indexOf(item) === pos)
      const profileIds = await this.profile.findAll({
        attributes: ['id'],
        where: { id: profiles },
        transaction
      })
      const validProfileIds = profiles.length === profileIds.length

      if (!resource || !validProfileIds)
        throw new BadRequestException('Usuário ou perfis não encontrados')

      await this.userProfile.destroy({
        where: { userId: resource.id },
        transaction
      })

      await Promise.all(
        profiles.map((profileId) =>
          this.userProfile.upsert(
            {
              userId: resource.id,
              profileId,
              createdBy: loggedUserId,
              deleted_at: null
            },
            { transaction }
          )
        )
      )

      const log = {
        newData: {
          userId: id,
          profiles
        },
        oldData: {
          userId: id,
          profiles: oldData.map((x) => x.profileId)
        },
        userId: loggedUserId,
        httpVerb: 'put',
        table: 'users_profiles'
      }

      this.logsClient.send({ log: 'create' }, log).toPromise()
      if (!trx) await transaction.commit()
    } catch (error) {
      if (!trx) await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar os perfis do usuário'
      )
    }
  }

  /**
   * Busca usuário por id
   * @param id number
   */
  async findById(id: number, authToken: string): Promise<UserDto> {
    const userData = await this.userModel.findByPk(id, {
      attributes: [
        'id',
        'imageId',
        'username',
        'email',
        'phone',
        'customerHierarchyEnabled',
        'substituteUserId',
        'substituteUserStartDate',
        'substituteUserEndDate',
        'isActive'
      ],
      include: [
        {
          model: UserProfile,
          attributes: ['profileId'],
          include: [{ model: Profile, attributes: ['name'] }]
        },
        { model: UserRepresentativeCode },
        { model: File, attributes: ['id', 'filename', 'contentType', 'path'] },
        {
          model: User,
          as: 'substituteUser',
          association: 'substituteUser',
          attributes: ['id', 'username']
        }
      ]
    })

    if (!userData) return undefined

    const user = userData.toJSON() as User

    const formattedUserProfiles =
      user.userProfiles &&
      user.userProfiles.map((userProfile) => ({
        profileId: userProfile.profileId,
        name: userProfile.profile.name
      }))

    const formattedUserRepresentativeCodes =
      user.representativeCodes &&
      (await Promise.all(
        user.representativeCodes.map(({ code }) => {
          return this.representativesService.findByCode(
            parseInt(code, 10),
            authToken
          )
        })
      ))

    return {
      ...user,
      userProfiles: formattedUserProfiles || [],
      representativeCodes: formattedUserRepresentativeCodes || []
    } as UserDto
  }

  /**
   * Busca usuário por id
   * @param id number
   */
  async getUserProfiles(id: number): Promise<GetUserProfilesResponseDto> {
    const userProfiles: UserProfile[] = await this.userProfile.findAll({
      where: {
        userId: id
      },
      attributes: ['profileId'],
      raw: true
    })

    return {
      data: userProfiles.map((userProfile) => userProfile.profileId)
    }
  }

  /**
   * Busca detalhes dos perfis de um usuario
   * @param id number
   */
  async getUserProfilesDetails(
    id: number
  ): Promise<GetUserProfilesDetailsResponseDto[]> {
    const userProfiles = await this.userProfile.findAll({
      where: {
        userId: id
      },
      attributes: ['profileId'],
      include: [
        {
          model: Profile,
          attributes: ['id', 'name'],
          where: {
            active: true
          },
          include: [
            {
              model: ProfilePermission,
              attributes: ['profileId'],
              include: [
                {
                  model: Permission,
                  attributes: ['id', 'alias']
                }
              ]
            },
            {
              model: ProfileAccess,
              attributes: ['profileId'],
              include: [
                {
                  model: Access,
                  attributes: ['id', 'alias'],
                  include: [
                    {
                      model: Field,
                      attributes: ['id', 'alias']
                    }
                  ]
                }
              ]
            },
            {
              model: ProfileAccessException,
              attributes: ['accessId'],
              include: [
                {
                  model: Access,
                  attributes: ['id', 'alias']
                },
                {
                  model: Permission,
                  attributes: ['id', 'alias']
                }
              ]
            },
            {
              model: ProfileMicro,
              attributes: ['fieldId']
            }
          ]
        }
      ]
    })

    return userProfiles
      .map((userProfile) => (userProfile.toJSON() as UserProfile).profile)
      .map((profile) => {
        const accesses = profile.accesses.map(
          (profileAccess) => profileAccess.access
        )
        const permissions = profile.permissions.map(
          (profilePermission) => profilePermission.permission.alias
        )
        const microsIds = profile.micros.map((micro) => micro.fieldId)

        return {
          id: profile.id,
          name: profile.name,
          accesses: accesses.map((access) => {
            const permissionExceptions = profile.exceptions
              .filter(
                (profileExceptions) => profileExceptions.accessId === access.id
              )
              .map((profileExceptions) => profileExceptions.permission.alias)

            return {
              name: access.alias,
              permissions: permissions.filter(
                (permission) => !permissionExceptions.includes(permission)
              ),
              fields: access.fields
                .filter((field) => !microsIds.includes(field.id))
                .map((field) => field.alias)
            }
          })
        }
      })
  }

  /**
   * Busca os gerentes regionais que o usuário tem acesso
   * @param userId number
   */
  async getUserRegionalManagers(
    userId: number,
    query: UserRegionalManagersQuery
  ): Promise<UserRegionalManagerDto[]> {
    return this.hierarchyService.getUserRegionalManagers(userId, query)
  }

  async getAllRepresentatives(
    query: RepresentativeQueryStringDto,
    userId: number,
    authToken: string
  ): Promise<RepresentativeDto[]> {
    const hierarchies = await this.hierarchyModel.findAll({
      attributes: [
        [literal('member_code'), 'memberCode'],
        [literal('member_desc'), 'memberDesc']
      ],
      where: {
        lastMember: true
      },
      include: [
        {
          model: UserRepresentativeCode,
          attributes: [],
          where: {
            userId
          },
          required: true
        }
      ],
      group: ['member_code', 'member_desc'],
      raw: true
    })
    if (hierarchies.length)
      return hierarchies.map((hierarchy) => ({
        code: hierarchy.memberCode,
        name: hierarchy.memberDesc
      }))

    return this.representativesService.findAll(query, authToken)
  }
}
