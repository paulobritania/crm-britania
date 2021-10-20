import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'isNotConjunction', async: false })
export class IsNotConjunction implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments): boolean {
    return !(propertyValue && args.object[args.constraints[0]])
  }

  defaultMessage(args: ValidationArguments): string {
    return `${ args.property } and ${ args.constraints[0] } must not be true at the same time`
  }
}
