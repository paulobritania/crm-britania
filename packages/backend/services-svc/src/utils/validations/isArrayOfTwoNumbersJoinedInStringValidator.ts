import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({
  name: 'isArrayOfTwoNumbersJoinedInString',
  async: false
})
export class IsArrayOfTwoNumbersJoinedInString
  implements ValidatorConstraintInterface
{
  validate(propertyValues: string[]): boolean {
    if (!propertyValues || !propertyValues.length) return true

    return !propertyValues.some((value) => {
      const splittedValues = value.split(',')

      if (splittedValues.length !== 2) return true

      const rightValue = Number(splittedValues[0])
      const leftValue = Number(splittedValues[1])

      return Number.isNaN(rightValue) || Number.isNaN(leftValue)
    })
  }

  defaultMessage(args: ValidationArguments): string {
    return `${ args.property } must be an array of two numbers joined by comma in string`
  }
}
