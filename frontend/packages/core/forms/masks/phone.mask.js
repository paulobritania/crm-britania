import size from 'lodash/size'

import { trimMask } from '@britania-crm/utils/formatters'

export default (value = '') => {
  if (size(trimMask(value)) < 11) {
    // the last digit enables the mask to change
    return '(99) 9999-99999'
  }
  return '(99) 99999-9999'
}
