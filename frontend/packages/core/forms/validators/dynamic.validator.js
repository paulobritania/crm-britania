
import * as Yup from 'yup'

import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import reduce from 'lodash/reduce'

import * as validators from './validators'

export default ({
  t,
  input,
  rules: fieldRules = [],
  ...props
}) => {
  const type = (() => {
    switch (input) {
      case 'transferList':
        return 'array'

      case 'autocomplete':
      case 'dateRange':
        return 'object'

      case 'checkboxStatus':
      case 'checkbox':
      case 'switchStatus':
      case 'switchBool':
        return 'bool'

      default:
        return 'string'
    }
  })()

  const YupInstance = Yup[type]()

  const rules = validators[input]
    ? [input].concat(fieldRules)
    : fieldRules

  if (isEmpty(rules)) {
    return YupInstance
  }

  return reduce(
    rules,
    (YupField, rule) => {
      const createFieldValidator = (ruleName, configs) => {
        const validator = validators[ruleName]

        if (!validator) return YupField

        return validator({
          t,
          isNotText: type !== 'string',
          ...configs
        })(YupField)
      }

      if (!rule) {
        return YupField
      }

      if (isString(rule)) {
        return createFieldValidator(rule, props)
      }

      // array
      const [ruleName, configs = {}] = rule
      return createFieldValidator(ruleName, { ...props, ...configs })
    },
    YupInstance
  )
}
