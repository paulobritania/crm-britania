import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthenticationModule } from './modules/authentication/authentication.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthenticationModule
  ]
})
export class AppModule {}
