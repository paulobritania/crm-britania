import {
  Injectable,
  Inject,
  BadRequestException,
  InternalServerErrorException,
  HttpException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'

import { convertToFindOptions } from '../../utils/pagination/pagedQuery.dto'
import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { CompaniesBankAccountDto } from './dtos/companiesBankAccount.dto'
import { CompaniesBankAccountQueryDto } from './dtos/companiesBankAccountQuery.dto'
import { CompanyDto } from './dtos/company.dto'
import { CompanyQueryDto } from './dtos/companyQuery.dto'
import { CompaniesBankAccount } from './entities/companiesBankAccount.entity'
import { Company } from './entities/company.entity'

@Injectable()
export class CompaniesService {
  constructor(
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(Company) private companyModel: typeof Company,
    @InjectModel(CompaniesBankAccount) private companyBankAccountModel: typeof CompaniesBankAccount
  ) {}

  /**
   * Lista todas as empresas e retorna paginado
   * @param query CompanyQueryDto
   */
  async findAll(query: CompanyQueryDto): Promise<PagedResult<CompanyDto>> {
    const result: PagedResult<CompanyDto> = {
      totalRegisters: 0,
      data: []
    }

    result.totalRegisters = await this.companyModel.count()
    result.data = await this.companyModel.findAll({
      attributes: ['id', 'name', 'cnpj', 'bankCode'],
      ...convertToFindOptions(query.page, query.pageSize),
      order: [[query.orderBy || 'id', query.sort || 'ASC']]
    })

    return result
  }


    /**
   * Lista dados bancarios das empresas e retorna paginado
   * @param query CompaniesBankAccountDto
   */
     async findCompaniesBankAccount(query: CompaniesBankAccountQueryDto): Promise<PagedResult<CompaniesBankAccountDto>> {
      const result: PagedResult<CompaniesBankAccountDto> = {
        totalRegisters: 0,
        data: []
      }

      result.totalRegisters = await this.companyBankAccountModel.count()
      result.data = await this.companyBankAccountModel.findAll({
        where: {
          ...(query.id && {
            id: {
              $like: `%${ query.id }%`
            }
          }),
          ...(query.companyCode && {
            companyCode: {
              $like: `%${ query.companyCode }%`
            }
          }),
          ...(query.bankCode && {
            bankCode: {
              $like: `%${ query.bankCode }%`
            }
          }),
          ...(query.agency && {
            agency: {
              $like: `%${ query.agency }%`
            }
          }),
          ...(query.account && {
            account: {
              $like: `%${ query.account }%`
            }
          }),
          ...(query.note && {
            note: {
              $like: `%${ query.note }%`
            }
          })
        },
        attributes: ['id', 'companyCode', 'bankCode', 'agency', 'account', 'note'],
        ...convertToFindOptions(query.page, query.pageSize)
      })

      return result
    }

  /**
   * Busca uma empresa específica
   * @param id number
   * @returns Company
   */
  async findOne(id: number): Promise<CompanyDto> {
    return this.companyModel.findByPk(id, {
      attributes: [
        'id',
        'name',
        'cnpj',
        'bankCode',
        'agency',
        'account',
        'identifier',
        'message'
      ]
    })
  }

  /**
   * Cria uma empresa e a retorna
   * @param data CompanyDto
   * @param userId number
   * @returns Company
   */
  async create(data: CompanyDto, userId: number): Promise<Company> {
    const transaction = await this.db.transaction()

    try {
      const companyData = {
        ...data,
        createdBy: userId,
        updatedBy: null
      }

      const company = await this.companyModel.create(companyData, {
        transaction
      })

      await transaction.commit()
      return company
    } catch (error) {
      await transaction.rollback()
      throw new InternalServerErrorException(
        'Ocorreu um arro ao cadastrar empresa'
      )
    }
  }

  /**
   * Atualiza uma empresa existente
   * @param data CompanyDto
   * @param id number
   * @param userId number
   */
  async update(data: CompanyDto, id: number, userId: number): Promise<number> {
    const transaction = await this.db.transaction()

    try {
      const company = await this.companyModel.findByPk(id)

      if (!company) throw new BadRequestException('Empresa não encontrada')

      const companyData = {
        ...data,
        updatedBy: userId
      }

      await company.update({ ...companyData }, { transaction })

      await transaction.commit()

      return company.id
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar empresa'
      )
    }
  }
}
