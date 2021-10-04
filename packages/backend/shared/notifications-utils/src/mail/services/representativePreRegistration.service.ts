import { Injectable } from '@nestjs/common'

import { RepresentativePreRegistrationMailDto } from '../dtos/representativePreRegistrationMail.dto'
import { EmailTypesEnum } from '../enums/emailTypes.enum'
import { MailService } from './mail.service'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment')

@Injectable()
export class RepresentativePreRegistrationMailService extends MailService {
  sendMail(
    to: string,
    content: RepresentativePreRegistrationMailDto
  ): Promise<void> {
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

    return super.send(
      to,
      subject,
      EmailTypesEnum.REPRESENTATIVE_PRE_REGISTRATION,
      body
    )
  }
}
