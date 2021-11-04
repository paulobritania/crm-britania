import size from 'lodash/size'

import { trimMask } from '@britania-crm/utils/formatters'

export default ({ t }) => (YupInstance) => YupInstance
  .test('phone', t('invalid phone'), (value = '') => {
    const numberPhoneString = trimMask(value);
    const DDD = Number(numberPhoneString.substring(0, 2));
    const length = size(trimMask(value))
    return !length || (length >= 10) && (DDD >= 11 && DDD <= 99);
  })
