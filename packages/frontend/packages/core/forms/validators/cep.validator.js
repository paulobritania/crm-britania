import size from 'lodash/size'

import { trimMask } from '@britania-crm/utils/formatters'

export default ({ t }) => (YupInstance) => YupInstance
  .test('cep', t('invalid cep'), (value) => !value || size(trimMask(value || '')) === 8)
