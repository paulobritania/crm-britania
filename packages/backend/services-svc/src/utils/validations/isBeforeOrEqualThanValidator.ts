import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'isBeforeOrEqualThan', async: false })
export class IsBeforeOrEqualThan implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments): boolean {
    if (!propertyValue && !args.object[args.constraints[0]]) return true
    if (!propertyValue || !args.object[args.constraints[0]]) return false

    return propertyValue <= args.object[args.constraints[0]]
  }

  defaultMessage(args: ValidationArguments): string {
    return `${ args.property } must be before or igual than"${ args.constraints[0] }"`
  }
}
