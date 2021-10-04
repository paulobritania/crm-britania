import { HttpModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { LoggerModule } from 'nestjs-pino'

import { BritaniaServiceImpl } from '../britania-svc/britania.service'
import { ServicesServiceImpl } from '../services-svc/services-svc.service'
import { AuthenticationController } from './authentication.controller'
import { AuthenticationServiceImpl } from './authentication.service'

@Module({
  imports: [
    HttpModule,
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: true
      }
    }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET_KEY,
          signOptions: {
            ...(process.env.JWT_EXPIRATION_TIME
              ? {
                  expiresIn: Number(process.env.JWT_EXPIRATION_TIME)
                }
              : {})
          }
        }
      }
    })
  ],
  controllers: [AuthenticationController],
  providers: [
    { provide: 'AuthenticationService', useClass: AuthenticationServiceImpl },
    { provide: 'BritaniaService', useClass: BritaniaServiceImpl },
    { provide: 'ServicesService', useClass: ServicesServiceImpl }
  ]
})
export class AuthenticationModule {}
