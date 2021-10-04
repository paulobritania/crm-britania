import { MailerService } from '@nestjs-modules/mailer'
import * as path from 'path'

import { EmailTypesEnum } from '../enums/emailTypes.enum'

export abstract class MailService {
  constructor(private mailerService: MailerService) {}

  send(
    to: string,
    subject: string,
    template: EmailTypesEnum,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    context: any,
    from?: string
  ): Promise<void> {
    return this.mailerService.sendMail({
      to,
      from,
      subject,
      template: path.resolve(__dirname, '..', 'templates', template),
      context
    })
  }
}
