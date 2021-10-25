/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */
import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
  HttpException,
  ForbiddenException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import officegen from 'officegen'
import { Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { Address } from '../address/entities/address.entity'
import { ClientsService } from '../clients/clients.service'
import { File } from '../files/entities/file.entity'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { HierarchyMemberClassEnum } from '../hierarchy/enums/hierarchyMemberClass.enum'
import { HierarchyService } from '../hierarchy/hierarchy.service'
import { CreateBuyerDto } from './dto/create/createBuyer.dto'
import { CreateBuyerLineFamily } from './dto/create/createBuyerLineFamily.dto'
import { FindAllBuyersQueryDto } from './dto/find/findAllBuyersQuery.dto'
import { FindMatrixDto } from './dto/find/findMatrixQuery.dto'
import { FindMatrixReturnDto } from './dto/find/findMatrixReturn.dto'
import { UpdateBuyerDto } from './dto/update/updateBuyer.dto'
import { UpdateBuyerLineFamily } from './dto/update/updateBuyerLineFamily'
import { Buyer } from './entities/buyer.entity'
import { BuyerAddress } from './entities/buyerAddress.entity'
import { BuyerLineFamily } from './entities/buyerLineFamily.entity'

@Injectable()
export class BuyersService {
  private readonly clientHierarchy = process.env.BRITANIA_CLIENTE_HIERARQUIA;

  constructor(
    @Inject(ClientsService) private clientsService: ClientsService,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(Buyer) private buyer: typeof Buyer,
    @InjectModel(BuyerAddress) private buyerAddress: typeof BuyerAddress,
    @InjectModel(BuyerLineFamily)
    private buyerLineFamily: typeof BuyerLineFamily,
    @InjectModel(Hierarchy) private hierarchy: typeof Hierarchy,
    @InjectModel(Address) private address: typeof Address,
    @Inject(HierarchyService)
    private readonly hierarchyService: HierarchyService
  ) {}

  /**
   * Irá validar se as relações entre linhas x famílias
   * existem, e se não há mais de um regional entre estes.
   * o CPF informado
   * @param data CreateBuyerLineFamily[]
   * @param clientCode number
   */
  async validateLinesFamilies(
    data: CreateBuyerLineFamily[],
    clientCode: number,
    transaction?: Transaction
  ): Promise<void> {
    const relations = await Promise.all(
      data.map(async (lineFamily) => {
        const hierarchy = await this.hierarchy.findAll({
          where: {
            clientCode,
            lineCode: lineFamily.lineCode,
            materialFamilyCode: {
              $or: [lineFamily.familyCode, '']
            },
            memberClassCode: HierarchyMemberClassEnum.REGIONAL_MANAGER
          },
          attributes: ['id', 'memberCode'],
          transaction,
          raw: true
        })
        if (!hierarchy)
          throw new BadRequestException(
            `A relação entre a linha ${ lineFamily.lineDescription } e a família ${ lineFamily.familyDescription } ` +
              'não foi encontrada na hierarquia do cliente selecionado'
          )
        return hierarchy
      })
    )

    const regionalsSet: Set<number> = new Set()
    const hierarchies = relations.reduce(
      (hierarchies, relation) => [...hierarchies, ...relation],
      []
    )

    hierarchies.forEach((relation) => {
      if (!regionalsSet.has(relation.memberCode) && regionalsSet.size > 0)
        throw new BadRequestException(
          'As linhas e famílias informadas correspondem a mais de um regional na hierarquia do cliente selecionado'
        )

      regionalsSet.add(relation.memberCode)
    })
  }

  /**
   * Irá registrar o comprador e suas respectivas relações
   * @param data CreateBuyerDto
   * @param userId number
   */
  async createBuyer(
    data: CreateBuyerDto,
    userId: number,
    trx?: Transaction
  ): Promise<number> {
    if (
      !(await this.hierarchyService.checkIfUserHasAccessToAClient(
        userId,
        data.clientTotvsCode
      ))
    )
      throw new ForbiddenException()

    if (await this.getExistenceBuyerByCpf(data.cpf))
      throw new BadRequestException(
        'Já existe um comprador cadastrado com o CPF informado'
      )

    await this.validateLinesFamilies(data.linesFamilies, data.clientTotvsCode)

    const transaction = trx || (await this.db.transaction())

    try {
      const {
        buyerAddress,
        parentCompanyAddress,
        linesFamilies,
        ...createData
      } = data

      const buyer = await this.buyer.create(
        {
          ...createData,
          active: true,
          createdBy: userId,
          updatedBy: userId
        },
        { transaction }
      )

      const addressBuyer = await this.address.create(buyerAddress, {
        transaction
      })
      const addressParent = await this.address.create(parentCompanyAddress, {
        transaction
      })

      await this.buyerAddress.create(
        {
          idAddress: addressBuyer.id,
          idBuyers: buyer.id,
          addressType: 1,
          deliveryAddress: buyerAddress.deliveryAddress
        },
        { transaction }
      )
      await this.buyerAddress.create(
        {
          idAddress: addressParent.id,
          idBuyers: buyer.id,
          addressType: 2,
          deliveryAddress: parentCompanyAddress.deliveryAddress
        },
        { transaction }
      )

      if (linesFamilies[0]) {
        await this.validateLinesFamilies(
          linesFamilies,
          data.clientTotvsCode,
          transaction
        )
        await this.multipleCreateLineFamily(
          buyer.id,
          linesFamilies,
          transaction
        )
      }

      if (!trx) await transaction.commit()

      return buyer.id
    } catch (err) {
      if (!trx) await transaction.rollback()
      if (err instanceof HttpException) throw err

      throw new InternalServerErrorException(
        'Ocorreu um erro durante a criação do comprador'
      )
    }
  }

  /**
   * Irá retornar as informações da matriz de acordo
   * com os parâmetros informados
   * @param query FindMatrixDto
   * @param authToken string
   * @param userId number
   */
  async getMatrix(
    query: FindMatrixDto,
    authToken: string
  ): Promise<FindMatrixReturnDto[]> {
    try {
      if (!query.clientTotvsCode && !query.cnpj && !query.name) {
        throw new BadRequestException(
          'Informe o nome, CNPJ ou o código do cliente'
        )
      }

      const queryGetClient = {
        q: 'cnpj, nomeCliente, codigoCliente, razaoSocial',
        nomeCliente: query.name,
        cnpj: query.cnpj,
        somenteMatriz: true,
        codigoMatriz: query.clientTotvsCode?.toString()
      }

      const listOfMatrix = await this.clientsService.getClients(
        queryGetClient,
        authToken
      )

      return listOfMatrix.clientes.map((cliente) => ({
        code: cliente.codigocliente,
        cnpj: cliente.cnpj,
        name: cliente.nomecliente.trim(),
        socialReason: cliente.razaosocial.trim()
      }))
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de clientes'
      )
    }
  }

  /**
   * Valida se existe um comprador com determinado cpf
   * @param cpf string
   * @returns Promise<boolean>
   */
  async getExistenceBuyerByCpf(cpf: string, id?: number): Promise<boolean> {
    const buyer = await this.buyer.findOne({
      where: {
        cpf,
        active: true,
        ...(id && { id: { $ne: id } })
      },
      attributes: ['id']
    })
    return !!buyer
  }

  /**
   * Irá retornar retornar todos os compradores
   * e as relações com as linhas com base nos
   * parâmetros informados
   * @param query FindAllBuyersQueryDto
   * @param userId number
   */
  async getAllBuyers(
    query: FindAllBuyersQueryDto,
    userId: number
  ): Promise<Buyer[]> {
    const clientCodes = await this.hierarchyService.getUserClientCodes(userId)
    if (!clientCodes) return []

    if (query.clientTotvsCode && clientCodes.length) {
      const codeExists = clientCodes.find(
        (clientCode) => clientCode === Number(query.clientTotvsCode)
      )
      if (!codeExists) return []
    }

    const buyers = await this.buyer.findAll({
      where: {
        ...(query.name && {
          name: {
            $like: `%${ query.name }%`
          }
        }),
        ...(query.active && { active: query.active }),
        ...(query.clientTotvsCode
          ? {
              clientTotvsCode: {
                $like: `%${ query.clientTotvsCode }%`
              }
            }
          : clientCodes.length && {
              clientTotvsCode: {
                $in: clientCodes
              }
            }),
        ...(query.birthday && {
          birthday: {
            $like: `%${ query.birthday }%`
          }
        }),
        ...(query.category && {
          category: {
            $like: `%${ query.category }%`
          }
        }),
        ...(query.cpf && {
          cpf: {
            $like: `%${ query.cpf }%`
          }
        }),
        ...(query.email && {
          email: {
            $like: `%${ query.email }%`
          }
        }),
        ...(query.imageId && {
          imageId: {
            $like: `%${ query.imageId }%`
          }
        }),
        ...(query.responsibleCode && {
          responsibleCode: {
            $like: `%${ query.responsibleCode }%`
          }
        }),
        ...(query.role && {
          role: {
            $like: `%${ query.role }%`
          }
        }),
        ...(query.telephone && {
        telephone: {
            $like: `%${ query.telephone }%`
          }
        }),
        ...(query.voltage && {
          voltage: {
            $like: `%${ query.voltage }%`
          }
        }),
        ...(query.id && {
          id: {
              $like: `%${ query.id }%`
            }
          })
      },
      attributes: [
        'id',
        'name',
        'cpf',
        'role',
        'voltage',
        'category',
        'email',
        'active',
        'birthday',
        'telephone',
        'clientTotvsCode',
        'responsibleCode',
        'responsibleDescription',
        'imageId'
      ],
      include: [
        {
          model: File,
          attributes: ['id', 'filename', 'contentType', 'path']
        },
        {
          model: this.buyerLineFamily,
          where: query.lineCodes && {
            lineCode: query.lineCodes.split(',').map((code) => Number(code))
          },
          required: !!query.lineCodes,
          attributes: ['lineDescription']
        }
      ],
      order: [['id', 'DESC']]
    })
    return buyers
  }

  /**
   * Irá atualizar os compradores, seus endereços e
   * deletar ou cadastrar linhas x famílias caso
   * sejam informadas
   * @param data UpdateBuyerDto
   * @param buyerId number
   * @param userId number
   */
  async update(
    data: UpdateBuyerDto,
    buyerId: number,
    userId: number,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())

    try {
      const buyer = await this.buyer.findByPk(buyerId, {
        attributes: ['id', 'clientTotvsCode'],
        include: [
          {
            model: this.buyerAddress,
            as: 'buyerAddress',
            attributes: ['idBuyers', 'idAddress']
          },
          {
            model: this.buyerLineFamily,
            attributes: ['id']
          }
        ]
      })
      if (!buyer) throw new BadRequestException('Comprador não encontrado')

      if (
        data.active &&
        data.cpf &&
        (await this.getExistenceBuyerByCpf(data.cpf, buyerId))
      )
        throw new BadRequestException(
          'Já existe um comprador cadastrado com o CPF informado'
        )

      if (
        !(await this.hierarchyService.checkIfUserHasAccessToAClient(
          userId,
          buyer.clientTotvsCode
        ))
      )
        throw new ForbiddenException()

      const {
        buyerAddress,
        parentCompanyAddress,
        linesFamilies,
        ...updateData
      } = data

      await buyer.buyerAddress.forEach((buyerAddress) => {
        this.buyerAddress.destroy({
          where: {
            idBuyers: buyerAddress.idBuyers,
            idAddress: buyerAddress.idAddress
          }
        })
      })

      const addressBuyer = await this.address.create(buyerAddress, {
        transaction
      })
      const addressParent = await this.address.create(parentCompanyAddress, {
        transaction
      })

      await this.buyerAddress.create(
        {
          idAddress: addressBuyer.id,
          idBuyers: buyer.id,
          addressType: 1,
          deliveryAddress: buyerAddress.deliveryAddress
        },
        { transaction }
      )
      await this.buyerAddress.create(
        {
          idAddress: addressParent.id,
          idBuyers: buyer.id,
          addressType: 2,
          deliveryAddress: parentCompanyAddress.deliveryAddress
        },
        { transaction }
      )

      const linesFamiliesDeleteIds = buyer.buyerLinesFamilies
        .filter(
          (relation) =>
            !linesFamilies.find((lineFamily) => lineFamily.id === relation.id)
        )
        .map((lineFamily) => lineFamily.id)
      if (linesFamiliesDeleteIds[0]) {
        await this.buyerLineFamily.destroy({
          where: {
            id: {
              $in: linesFamiliesDeleteIds
            }
          }
        })
      }
      const linesFamiliesToCreate = linesFamilies.filter(
        (lineFamily) => !lineFamily.id
      )
      if (linesFamiliesToCreate[0]) {
        await this.validateLinesFamilies(
          linesFamiliesToCreate,
          data.clientTotvsCode,
          transaction
        )
        await this.multipleCreateLineFamily(
          buyerId,
          linesFamiliesToCreate,
          transaction
        )
      }
      const linesFamiliesToUpdate = linesFamilies.filter(
        (lineFamily) => lineFamily.id
      )
      if (linesFamiliesToUpdate[0]) {
        await this.validateLinesFamilies(
          linesFamiliesToUpdate,
          buyer.clientTotvsCode,
          transaction
        )
        await this.multipleUpdateLineFamily(linesFamiliesToUpdate, transaction)
      }
      await buyer.update({ ...updateData, updatedBy: userId }, { transaction })
      if (!trx) await transaction.commit()
      return buyer.id
    } catch (err) {
      if (!trx) await transaction.rollback()
      if (err instanceof HttpException) throw err

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar comprador'
      )
    }
  }

  async multipleCreateLineFamily(
    buyerId: number,
    data: CreateBuyerLineFamily[],
    transaction: Transaction
  ): Promise<void> {
    const insert = data.map((value) => ({ buyerId, ...value }))
    await this.buyerLineFamily.bulkCreate(insert, { transaction })
  }

  async multipleUpdateLineFamily(
    data: UpdateBuyerLineFamily[],
    transaction: Transaction
  ): Promise<void> {
    await Promise.all(
      data.map(async (value) => {
        await this.buyerLineFamily.update(value, {
          where: {
            id: value.id
          },
          transaction
        })
      })
    )
  }

  /**
   * Irá gerar um relatório em formato xlsx de acordo com
   * os filtros
   * @param query FindAllBuyerReturnDto
   * @param userId number
   */
  async generateReport(
    query: FindAllBuyersQueryDto,
    userId: number,
    res: Response
  ): Promise<void> {
    const buyers:any = await this.getAllBuyers(query, userId)
    const formatedBuyers = []
    buyers.forEach((buyer) => {
      buyers.buyerLinesFamilies.forEach(element => {
        const newObject = {
          name: buyer.name,
          role: buyer.role,
          line: element.lineDescription,
          regionalManager: element.regionalManagerDescription,
          responsible: buyer.responsibleDescription,
          active: buyer.active ? 'Ativo' : 'Inativo'
        }
       formatedBuyers.push(newObject)
      })
    })
    const xlsx = officegen('xlsx')
    const sheet = xlsx.makeNewSheet()
    sheet.name = 'Officegen Excel'

    sheet.data[0] = []
    sheet.data[0][0] = 'NOME'
    sheet.data[0][1] = 'MATRIZ/EMPRESA'
    sheet.data[0][2] = 'LINHA'
    sheet.data[0][3] = 'REGIONAL'
    sheet.data[0][4] = 'RESPONSÁVEL'
    sheet.data[0][5] = 'STATUS'

    formatedBuyers.forEach((buyer, i) => {
      i += 1
      sheet.data[i] = []
      Object.values(buyer).forEach((value, x) => {
        sheet.data[i][x] = value
      })
    })
    await xlsx.generate(res)
  }
}
