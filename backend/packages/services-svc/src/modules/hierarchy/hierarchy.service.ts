import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'

import { UserRepresentativeCode } from '../users/entities/userRepresentativeCode.entity'
import { ClientRegionalManagerDto } from './dtos/clientRegionalManager.dto'
import { GetClientHierarchyRepresentativesQueryDto } from './dtos/getRegionalClientQuery.dto'
import { HierarchyLevelsDto } from './dtos/hierarchyLevels.dto'
import { UserRegionalManagerDto } from './dtos/userRegionalManager.dto'
import { UserRegionalManagersQuery } from './dtos/userRegionalManagersQuery.dto'
import { Hierarchy } from './entities/hierarchy.entity'
import { HierarchyMemberClassEnum } from './enums/hierarchyMemberClass.enum'

@Injectable()
export class HierarchyService {
  constructor(
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(Hierarchy) private hierarchyModel: typeof Hierarchy,
    @InjectModel(UserRepresentativeCode)
    private userRepresentativeCodeModel: typeof UserRepresentativeCode
  ) {}

  /**
   * Valida se o usuário possui representantes atrelados ao seu perfil
   * @param userId number
   * @returns Promise<boolean>
   */
  async checkIfUserHasRepresentatives(userId: number): Promise<boolean> {
    const representativeCodes = await this.userRepresentativeCodeModel.findOne({
      attributes: ['userId'],
      where: {
        userId
      }
    })

    return !!representativeCodes
  }

  /**
   * Busca os códigos de clientes de um usuário
   * @param userId number
   */
  async getUserClientCodes(userId: number): Promise<number[]> {
    if (!(await this.checkIfUserHasRepresentatives(userId))) return []

    const hierarchies = await this.hierarchyModel.findAll({
      include: [
        {
          model: UserRepresentativeCode,
          where: {
            userId
          },
          attributes: [],
          required: true
        }
      ],
      attributes: ['clientCode'],
      group: ['client_code'],
      raw: true
    })

    if (!hierarchies.length) return null

    return hierarchies.map((hierarchy) => hierarchy.clientCode)
  }

  /**
   * Busca todas as linhas de um cliente
   * @param clientCode number
   * @returns Promise<number[]>
   */
  async getClientLines(clientCode: number): Promise<number[]> {
    const hierarchies = await this.hierarchyModel.findAll({
      where: {
        clientCode
      },
      attributes: ['lineCode'],
      group: ['line_code'],
      raw: true
    })

    return hierarchies.map((hierarchy) => hierarchy.lineCode)
  }

  /**
   * Busca todas as famílias de um cliente
   * @param clientCode number
   * @returns Promise<number[]>
   */
  async getClientFamilies(
    clientCode: number,
    lineCode?: number
  ): Promise<string[]> {
    const hierarchies = await this.hierarchyModel.findAll({
      where: {
        clientCode,
        materialFamilyCode: {
          $ne: ''
        },
        ...(lineCode && {
          lineCode
        })
      },
      attributes: ['materialFamilyCode'],
      group: ['material_family_code'],
      raw: true
    })

    return hierarchies.map((hierarchy) => hierarchy.materialFamilyCode)
  }

  /**
   * Valida se um usuário possui acesso a um cliente
   * @param userId number
   * @param clientTotvsCode number
   * @returns Promise<boolean>
   */
  async checkIfUserHasAccessToAClient(
    userId: number,
    clientCode: number
  ): Promise<boolean> {
    const userHasRepresentatives = await this.checkIfUserHasRepresentatives(
      userId
    )
    if (!userHasRepresentatives) return true

    const rows = await this.hierarchyModel.count({
      where: {
        clientCode
      },
      include: [
        {
          model: UserRepresentativeCode,
          where: {
            userId
          },
          required: true,
          attributes: []
        }
      ]
    })

    return rows > 0
  }

  /**
   * Returna os níveis hierárquicos
   */
  async getHierarchyLevels(): Promise<HierarchyLevelsDto[]> {
    const hierarchies = await this.hierarchyModel.findAll({
      attributes: ['memberClassCode', 'memberClassDesc'],
      group: ['member_class_code', 'member_class_desc']
    })

    return hierarchies.map((hierarchy) => ({
      code: hierarchy.memberClassCode,
      description: hierarchy.memberClassDesc
    }))
  }

  /**
   * Retorna os responsáveis de um cliente caso o usuário possua acesso
   * @param userId number
   * @param clientCode number
   * @param lineCodes number[]
   * @returns Promise<ReturnRegionalDto[]>
   */
  async getClientResponsible(
    query: GetClientHierarchyRepresentativesQueryDto,
    clientCode: number,
    userId: number
  ): Promise<ClientRegionalManagerDto[]> {
    if (!(await this.checkIfUserHasAccessToAClient(userId, clientCode)))
      return []

    const linesAndFamilies =
      query.linesAndFamilies?.map((value) => {
        const splittedValues = value.split(',')

        return {
          lineCode: Number(splittedValues[0]),
          familyCode: Number(splittedValues[1])
        }
      }) || []

    const hierarchies = await this.hierarchyModel.findAll({
      attributes: ['memberCode', 'memberDesc'],
      group: ['member_code', 'member_desc'],
      raw: true,
      where: {
        lastMember: true,
        clientCode,
        ...(query.lineCodes && { lineCode: query.lineCodes }),
        ...(linesAndFamilies.length && {
          $or: linesAndFamilies.map(({ lineCode, familyCode }) => ({
            $and: [
              { lineCode },
              { materialFamilyCode: { $or: [familyCode, ''] } }
            ]
          }))
        })
      }
    })

    return hierarchies.map((hierarchy) => ({
      approverCode: hierarchy.memberCode,
      approverDescription: hierarchy.memberDesc
    }))
  }

  /**
   * Retorna os gerentes regionais de um cliente caso o usuário possua acesso
   * @param userId number
   * @param clientCode number
   * @param lineCodes number[]
   * @returns Promise<ReturnRegionalDto[]>
   */
  async getClientRegionalManagers(
    query: GetClientHierarchyRepresentativesQueryDto,
    clientCode: number,
    userId: number
  ): Promise<ClientRegionalManagerDto[]> {
    if (!(await this.checkIfUserHasAccessToAClient(userId, clientCode)))
      return []

    const linesAndFamilies =
      query.linesAndFamilies?.map((value) => {
        const splittedValues = value.split(',')

        return {
          lineCode: Number(splittedValues[0]),
          familyCode: Number(splittedValues[1])
        }
      }) || []

    const hierarchies = await this.hierarchyModel.findAll({
      attributes: ['memberCode', 'memberDesc'],
      group: ['member_code', 'member_desc'],
      raw: true,
      where: {
        memberClassCode: HierarchyMemberClassEnum.REGIONAL_MANAGER,
        clientCode,
        ...(query.lineCodes && { lineCode: query.lineCodes }),
        ...(linesAndFamilies.length && {
          $or: linesAndFamilies.map(({ lineCode, familyCode }) => ({
            $and: [
              { lineCode },
              { materialFamilyCode: { $or: [familyCode, ''] } }
            ]
          }))
        })
      }
    })

    return hierarchies.map((hierarchy) => ({
      approverCode: hierarchy.memberCode,
      approverDescription: hierarchy.memberDesc
    }))
  }

  /**
   * Busca os gerentes regionais de um usuário
   * @param userId number
   */
  async getUserRegionalManagers(
    userId: number,
    query: UserRegionalManagersQuery
  ): Promise<UserRegionalManagerDto[]> {
    const userHasRepresentatives = await this.checkIfUserHasRepresentatives(
      userId
    )

    const regionals = await this.hierarchyModel.findAll({
      where: {
        memberClassCode: HierarchyMemberClassEnum.REGIONAL_MANAGER,
        ...(query.code && { memberCode: { $like: `%${ query.code }%` } }),
        ...(query.description && {
          memberDesc: { $like: `%${ query.description }%` }
        })
      },
      attributes: ['memberCode', 'memberDesc'],
      group: ['member_code', 'member_desc'],
      order: [['member_desc', 'ASC']],
      raw: true,
      include: userHasRepresentatives
        ? [
            {
              model: UserRepresentativeCode,
              where: { userId },
              required: true,
              attributes: []
            }
          ]
        : []
    })

    return regionals.map((regional) => ({
      code: regional.memberCode,
      description: regional.memberDesc
    }))
  }
}
