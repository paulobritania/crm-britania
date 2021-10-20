import { Provider } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { DatabaseModelList } from './database.models'

export const DatabaseProvider: Provider = {
  provide: 'SEQUELIZE',
  useFactory: async (logger: PinoLogger = null) => {
    logger.setContext('Sequelize')

    const db: Sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '1433', 10),
        logging: logger && logger.info.bind(logger),
        benchmark: true,
        retry: {
          max: 3
        },
        operatorsAliases: {
          $like: Op.like,
          $iLike: Op.iLike,
          $notLike: Op.notLike,
          $not: Op.not,
          $in: Op.in,
          $notIn: Op.notIn,
          $isNull: Op.is,
          $isNotNull: Op.not,
          $or: Op.or,
          $and: Op.and,
          $greaterThen: Op.gt,
          $greaterOrEqualThen: Op.gte,
          $lowerThen: Op.lt,
          $lowerOrEqualThen: Op.lte,
          $between: Op.between,
          $notBetween: Op.notBetween,
          $eq: Op.eq,
          $ne: Op.ne
        }
      }
    )

    db.addModels(DatabaseModelList)

    return db
  },
  inject: [PinoLogger]
}
