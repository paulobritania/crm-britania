import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'isValidPeriodValidator', async: false })
export class IsValidPeriodValidator implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments): boolean {
    if (!propertyValue && !args.object[args.constraints[0]]) return true
    if (!propertyValue || !args.object[args.constraints[0]]) return false

    return true
  }

  defaultMessage(): string {
    return 'Period not valid. Both dates must be null or must have a valid value.'
  }
}
