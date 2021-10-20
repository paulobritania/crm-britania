import size from 'lodash/size'

import { trimMask } from '@britania-crm/utils/formatters'

export default ({ t }) => (YupInstance) => YupInstance
  .test('code', t('invalid code'), (value) => size(trimMask(value || '')) === 6)
