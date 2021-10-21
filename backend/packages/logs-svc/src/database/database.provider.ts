import { Provider } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { Sequelize } from 'sequelize-typescript'

import { Log } from '../entities/logs.entity'




export const DatabaseProvider: Provider = {
  provide: 'SEQUELIZE',
  useFactory: async (logger: PinoLogger) => {
    logger.setContext('Sequelize')

    const db: Sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '1433', 10),
        logging: logger.info.bind(logger),
        benchmark: true,
        retry: {
          max: 3
        }
      }
    )

    db.addModels([
      Log
    ])

    return db
  },
  inject: [PinoLogger]
}
