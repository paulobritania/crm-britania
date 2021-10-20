import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

import {
  isValidDate,
  getLocalStartOfDayAsUtc,
  getUtcDate
} from '../dates/dateUtils'

@ValidatorConstraint({ name: 'isCurrentOrFutureDate', async: false })
export class IsCurrentOrFutureDate
  implements ValidatorConstraintInterface
{
  validate(propertyValue: string): boolean {
    if (!propertyValue) return false

    if (!isValidDate(propertyValue)) return false

    return getLocalStartOfDayAsUtc() <= getUtcDate(propertyValue)
  }

  defaultMessage(args: ValidationArguments): string {
    return `${ args.property } must be the current date or a future date"`
  }
}
