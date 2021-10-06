import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { join } from 'path'

import { ClientPreRegistrationMailService } from './mail/services/clientPreRegistration.service'
import { RepresentativePreRegistrationMailService } from './mail/services/representativePreRegistration.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT),
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
          }
        },
        defaults: {
          from: process.env.MAIL_FROM
        },
        template: {
          dir: join(__dirname, 'mail/templates/'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      })
    })
  ],
  providers: [
    ClientPreRegistrationMailService,
    RepresentativePreRegistrationMailService
  ],
  exports: [
    ClientPreRegistrationMailService,
    RepresentativePreRegistrationMailService
  ]
})
export class NotificationsUtilsModule {}
