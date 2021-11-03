import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { convertToFindOptions } from '../../utils/pagination/pagedQuery.dto'
import { BankDto } from './dtos/bank.dto'
import { BanksQueryDto } from './dtos/banksQuery.dto'
import { Bank } from './entities/bank.entity'

@Injectable()
export class BanksService {
  constructor(@InjectModel(Bank) private bankModel: typeof Bank) {}

  /**
   * Consulta de agências bancárias
   * @param query BanksQueryDto
   * @returns Promise<PagedResult<BankDto>>
   */
  findAll(query: BanksQueryDto): Promise<BankDto[]> {
    return this.bankModel.findAll({
      attributes: ['code', 'description'],
      where: {
        ...(query.description && {
          description: {
            $like: `%${ query.description }%`
          }
        }),
        ...(query.code && {
          code: {
            $like: `%${ query.code }%`
          }
        }),
      },
      ...convertToFindOptions(query.page, query.pageSize)
    })
  }
}
