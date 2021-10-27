import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

import { ClientPreRegistrationMailDto } from '../dtos/clientPreRegistrationMail.dto'
import { EmailTypesEnum } from '../enums/emailTypes.enum'
import { MailService } from './mail.service'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment')

@Injectable()
export class ClientPreRegistrationMailService extends MailService {
  constructor(mailerService: MailerService) {
    super(mailerService)
  }

  sendMail(to: string, content: ClientPreRegistrationMailDto): Promise<void> {
    const { companyName, cnpj, taskTitle, ...restContent } = content
    const formattedCnpj = cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1 $2 $3/$4-$5'
    )

    const subject = `${ companyName } - ${ formattedCnpj } - ${ taskTitle }`

    const body = {
      ...restContent,
      dateLimit: moment(restContent.dateLimit)
        .utcOffset('-0300')
        .format('DD/MM/YYYY HH:mm:ss'),
      responses: restContent.responses.map((response) => ({
        ...response,
        respondedAt: moment(response.respondedAt)
          .utcOffset('-0300')
          .format('DD/MM/YYYY HH:mm:ss')
      }))
    }

    return super.send(to, subject, EmailTypesEnum.CLIENT_PRE_REGISTRATION, body)
  }
}
