import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({
  name: 'isRequiredWhenAnotherFieldIsProvided',
  async: false
})
export class IsRequiredWhenAnotherFieldIsProvided
  implements ValidatorConstraintInterface
{
  validate(propertyValue: string, args: ValidationArguments): boolean {
    if (!args.object[args.constraints[0]]) return true

    return !!propertyValue
  }

  defaultMessage(args: ValidationArguments): string {
    return `$property must have a value when ${ args.constraints } is provided`
  }
}
