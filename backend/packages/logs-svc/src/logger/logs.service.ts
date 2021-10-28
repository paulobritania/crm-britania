import { Inject, Injectable, InternalServerErrorException, HttpException } from '@nestjs/common'

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
  ) {}

  async create(data: Log): Promise<void>{
    await this.logs.create(data)
  }

  /**
   * Irá gerar um relatório em formato xlsx de acordo com
   * os filtros
   * @param query FindAllLogsQueryDto
   * @param columns Array<any>
   */
   async generateReport(
    query: FindAllLogsQueryDto,
    table: Array<any>,
    res: Response
  ): Promise<void> {

    try{
      const logs = await this.logs.findAll(
        {
          where:
          {
            table: table,
            ...(query.log && {
              new_data: {
                $like: `%${query.log}%`
              }
            }),
            ...(query.log && {
              old_data: {
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
      columns.forEach((column, index) => {
        sheet.data[0][index] = column;
      })

      logs.forEach((log, i) => {
        i += 1
        sheet.data[i] = []
        Object.values(log).forEach((value, x) => {
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
