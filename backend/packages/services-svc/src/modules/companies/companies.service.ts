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
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(Company) private companyModel: typeof Company,
    @InjectModel(CompaniesBankAccount)
    private companyBankAccountModel: typeof CompaniesBankAccount
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
      attributes: ['id', 'name', 'cnpj'],
      ...convertToFindOptions(query.page, query.pageSize),
      order: [[query.orderBy || 'id', query.sort || 'ASC']]
    })

    return result
  }

  /**
   * Lista dados bancarios das empresas e retorna paginado
   * @param query CompaniesBankAccountQueryDto
   */
  async findCompaniesBankAccount(
    query: CompaniesBankAccountQueryDto
  ): Promise<PagedResult<CompaniesBankAccountDto>> {
    const result: PagedResult<CompaniesBankAccountDto> = {
      totalRegisters: 0,
      data: []
    }

    try {
      result.totalRegisters = await this.companyBankAccountModel.count()
      result.data = await this.companyBankAccountModel.findAll({
        where: {
          ...(query.id && {
            id: {
              $like: `%${ query.id }%`
            }
          }),
          ...(query.companyId && {
            companyId: {
              $like: `%${ query.companyId }%`
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
        attributes: [
          'id',
          'companyId',
          'bankCode',
          'agency',
          'account',
          'note'
        ],
        ...convertToFindOptions(query.page, query.pageSize)
      })
    } catch (error) {
      throw new InternalServerErrorException(
        `Ocorreu um erro ao cadastrar empresa: \n${  error }`
      )
    }

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
        'cnpj'
      ]
    })
  }

  /**
   * Cria uma empresa e a retorna
   * @param data CompanyDto
   * @param userId number
   * @returns Company
   */
  async create(data: CompanyDto, userId: number): Promise<number> {
    const transaction = await this.db.transaction()

    const companyData = {
      ...data,
      createdBy: userId,
      updatedBy: null
    }
    try {
      const company = await this.companyModel.create(companyData, {
        transaction
      })

      transaction.commit()
      return company.id
    } catch (error) {
      transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        `Ocorreu um arro ao cadastrar empresa${  error }`
      )
    }
  }


    /**
   * Cria uma conta bancaria da empresa e a retorna
   * @param data CompaniesBankAccountDto
   * @param userId number
   * @returns CompaniesBankAccount
   */
     async createCompanyBankAccount(data: CompaniesBankAccountDto, userId: number): Promise<CompaniesBankAccount> {
      const transaction = await this.db.transaction()

      const companyBankAccountData = {
        ...data,
        createdBy: userId,
        updatedBy: null
      }
      try {

        const company = await this.companyBankAccountModel.create(companyBankAccountData, {
          transaction
        })

        await transaction.commit()
        return company
      } catch (error) {
        await transaction.rollback()
        throw new InternalServerErrorException(
          `Ocorreu um arro ao cadastrar empresa: ${ error }`
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

    /**
   * Atualiza uma conta existente
   * @param data CompaniesBankAccountDto
   * @param id number
   * @param userId number
   */
     async updateCompanyBankAccount(data: CompaniesBankAccountDto, id: number, userId: number): Promise<number> {
      const transaction = await this.db.transaction()

      try {
        const companyBankAccount = await this.companyBankAccountModel.findByPk(id)

        if (!companyBankAccount) throw new BadRequestException('conta não encontrada')

        const companyBankAccountData = {
          ...data,
          updatedBy: userId
        }

        await companyBankAccount.update({ ...companyBankAccountData }, { transaction })

        await transaction.commit()

        return companyBankAccount.id
      } catch (error) {
        await transaction.rollback()
        if (error instanceof HttpException) throw error

        throw new InternalServerErrorException(
          `Ocorreu um erro ao atualizar a conta: ${  error }`
        )
      }
    }

      /**
   * Exclui uma conta bancaria
   * @param id number
   * @param userId number
   */
  async deleteCompanyBankAccount(id: number, userId: number): Promise<void> {
    const transaction = await this.db.transaction()

    try {
      const bankAccount = await this.companyBankAccountModel.findByPk(id)

      if (!bankAccount) throw new BadRequestException('Conta não encontrada')

      const log = {
        oldData: bankAccount.get({ plain: true }),
        userId,
        httpVerb: 'delete',
        table: 'companies_bank_account'
      }

      await bankAccount.destroy({ transaction })
      this.logsClient.send({ log: 'create' }, log).toPromise()

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException('Erro ao remover a conta')
    }
  }
}
