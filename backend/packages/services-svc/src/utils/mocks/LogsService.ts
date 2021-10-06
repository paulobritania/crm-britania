import { ConfigService } from '@nestjs/config'

export const LogsService = {
  provide: 'LOGS_SERVICE',
  inject: [ConfigService],
  useFactory: jest.fn(() => ({
    send: jest.fn(() => ({
      toPromise: jest.fn()
    }))
  }))
}
