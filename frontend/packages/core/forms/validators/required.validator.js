import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'

import { MSG007 } from '@britania-crm/constants/feedbackMessages.constants'

export default ({ isNotText, isDateRange }) =>
  (YupInstance) => {
    let aux = YupInstance

    if (!isNotText) {
      aux = aux.trim()
    } else {
      aux = aux.test('notEmpty', MSG007, (value) =>
        isDateRange
          ? !!(value?.from && value.to)
          : !isEmpty(value) ||
            isNumber(value) ||
            isBoolean(value) ||
            value instanceof File
      )
    }

    return aux.required(MSG007)
  }
