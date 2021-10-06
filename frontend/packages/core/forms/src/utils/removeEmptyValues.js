
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import reduce from 'lodash/reduce'

const removeEmptyValues = (values) => reduce(
  values,
  (acc, item, name) => {
    if (
      isNumber(item) ||
      isBoolean(item) ||
      isArray(item) ||
      item instanceof File ||
      (isString(item) && !isEmpty(item))
    ) {
      return { ...acc, [name]: item }
    } else if (isObject(item)) {
      const objItem = removeEmptyValues(item)
      return { ...acc, [name]: objItem }
    }
    return acc
  },
  {}
)

export default removeEmptyValues
