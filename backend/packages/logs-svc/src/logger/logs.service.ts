import { Inject, Injectable, InternalServerErrorException, HttpException } from '@nestjs/common'

import { Sequelize } from 'sequelize-typescript'

import officegen from 'officegen'

import { InjectModel } from '@nestjs/sequelize'
import { Log } from './entities/logs.entity'
import { LogsService } from './logs.interface'
import { FindAllLogsQueryDto } from './dto/findAllLogsQuery.dto'
@Injectable()
export class LogsServiceImpl implements LogsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectModel(Log) private logs: typeof Log,
    @Inject('SEQUELIZE') private db: Sequelize,
  ) {}

  async create(data: Log): Promise<void>{
    await this.logs.create(data)
  }

  /**
   * Irá gerar um relatório em formato xlsx de acordo com
   * os filtros
   * @param query FindAllBuyerReturnDto
   * @param userId number
   */
   async generateReport(
    userId: number,
    query: FindAllLogsQueryDto,
    res: Response
  ): Promise<void> {

    try{
      const buyers = await this.logs.findAll(
        {
          where:
          {
            ...(query.table && {
              table: {
                $like: `%${query.table}%`
              }
            }),
            ...(query.log && {
              table: {
                $like: `%${query.log}%`
              }
            })
          }
        }
      )

      const xlsx = officegen('xlsx')
      const sheet = xlsx.makeNewSheet()
      sheet.name = 'Officegen Excel'

      sheet.data[0] = []
      sheet.data[0][0] = 'NOME COMPLETO'
      sheet.data[0][1] = 'CPF'
      sheet.data[0][2] = 'ENDERECO'
      sheet.data[0][3] = 'TELEFONE'
      sheet.data[0][4] = 'CARGO'
      sheet.data[0][5] = 'CATEGORIA'
      sheet.data[0][6] = 'E-MAIL'
      sheet.data[0][7] = 'ANIVERSARIO'
      sheet.data[0][8] = 'CODIGO DA MATRIZ'
      sheet.data[0][9] = 'LINHA'
      sheet.data[0][10] = 'FAMILIA'
      sheet.data[0][11] = 'RESPONSAVEL'
      sheet.data[0][12] = 'GERENTE REGIONAL'
      sheet.data[0][13] = 'VOLTAGEM'
      sheet.data[0][14] = 'STATUS'

      buyers.forEach((buyer, i) => {
        i += 1
        sheet.data[i] = []
        Object.values(buyer).forEach((value, x) => {
          sheet.data[i][x] = value
        })
      })
      await xlsx.generate(res)

    } catch (error) {
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao gerar relatório'
      )
    }

  }
}
