import size from 'lodash/size'

import { trimMask } from '@britania-crm/utils/formatters'

export default ({ t }) => (YupInstance) => YupInstance
  .test('phone', t('invalid phone'), (value = '') => {
    const length = size(trimMask(value))
    return !length || (length >= 10)
  })
