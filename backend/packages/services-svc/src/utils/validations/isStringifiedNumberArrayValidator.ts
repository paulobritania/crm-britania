import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'isStringifiedNumberArray', async: false })
export class IsStringifiedNumberArray implements ValidatorConstraintInterface {
  validate(propertyValue: string): boolean {
    if (!propertyValue) return false

    const values = propertyValue.split(',')

    const invalidValues = values.filter((value) => !/^\d+$/.test(value.trim()))

    return !invalidValues.length
  }

  defaultMessage(args: ValidationArguments): string {
    return `${ args.property } must be a stringified array of numbers`
  }
}
