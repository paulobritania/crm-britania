import {
  BadRequestException,
  HttpException,
  ValidationError
} from '@nestjs/common'

import * as ptBrMessages from './errorMessages.pt-BR.json'

class PropertyWithError {
  property: string

  fullPropName: string

  constraints: {
    [type: string]: string
  }
}

class TranslatedError {
  field: string

  message: string
}

class FormattedError {
  field: string

  messages: string[]
}

type Messages = string | { original: string[]; translated: string[] }

const getPropertiesWithErrors = (
  validationErrors: ValidationError[],
  propName = ''
): any => {
  return validationErrors.reduce((arr, error) => {
    const isProperty = Number.isNaN(Number(error.property))
    const currentPropName = isProperty ? error.property : `[${ error.property }]`

    const fullPropName = propName
      ? `${ propName }${ isProperty ? '.' : '' }${ currentPropName }`
      : currentPropName

    if (error.constraints) {
      return [
        ...arr,
        {
          property: error.property,
          fullPropName,
          constraints: error.constraints
        }
      ]
    }

    return [...arr, ...getPropertiesWithErrors(error.children, fullPropName)]
  }, [] as PropertyWithError[])
}

export const translateErrors = (
  validationErrors: ValidationError[]
): HttpException => {
  const propertiesWithErrors = getPropertiesWithErrors(validationErrors)

  const errors: TranslatedError[][] = propertiesWithErrors.map(
    (error: PropertyWithError): TranslatedError[] =>
      Object.keys(error.constraints).map((key: string): TranslatedError => {
        const constraint = error.constraints[key].replace(
          error.property,
          '$property'
        )
        let message: Messages = ptBrMessages[key] || constraint

        if (typeof message === 'object') {
          const { original, translated } = message
          original.some((msg, index) => {
            const pattern = msg.replace('$', '\\$')
            const match = new RegExp(pattern, 'g').exec(constraint)

            if (match) {
              let msg = translated[index]
              for (let i = 1; i < match.length; i += 1) {
                msg = msg.replace(`{{constraint${ i }}}`, match[i])
              }
              message = msg
              return true
            }

            message = constraint
            return false
          })
        }

        return {
          field: error.fullPropName,
          message: (message as string).replace('$property ', '')
        }
      })
  )

  const formattedErrors = errors.reduce((data, errors) => {
    const formattedError: FormattedError = errors.reduce(
      (obj, error) => ({
        field: obj.field || error.field,
        messages: [...obj.messages, error.message]
      }),
      { field: '', messages: [] } as FormattedError
    )

    return [...data, formattedError]
  }, [] as FormattedError[])

  return new BadRequestException({
    errorCode: 'VALIDATION_FAILED',
    details: formattedErrors
  })
}
