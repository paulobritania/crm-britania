/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
import { DatabaseModelList } from './database.models'

type IMockDbTransaction = {
  commit: jest.Mock
  rollback: jest.Mock
}

type IMockFactory = {
  addModels(models: any[]): any[]
  transaction(): IMockDbTransaction
}

type IDatabaseProviderMock = {
  provide: string
  useFactory(): IMockFactory
}

let DatabaseProviderMock: IDatabaseProviderMock = null

export default (() => {
  if (!DatabaseProviderMock) {
    let db = null
    let transactionMethods = null

    DatabaseProviderMock = {
      provide: 'SEQUELIZE',
      useFactory: () => {
        if (!db) {
          db = {
            addModels: (models: Array<any>) => models,
            transaction: () => {
              if (!transactionMethods) {
                transactionMethods = {
                  commit: jest.fn(),
                  rollback: jest.fn()
                }
              }

              return transactionMethods
            }
          }

          db.addModels(DatabaseModelList)
        }

        return db
      }
    }
  }

  return DatabaseProviderMock
})()
