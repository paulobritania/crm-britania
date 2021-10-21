
import {
  cpf,
  cnpj
} from 'cpf-cnpj-validator'

import size from 'lodash/size'

import { trimMask } from '@britania-crm/utils/formatters'

export default ({ t, mode }) => (YupInstance) => YupInstance
  .test('cpf', t('invalid CPF'), (value) => {
    if (value && mode !== 'cnpj' && size(trimMask(value || '')) <= 11) {
      return cpf.isValid(value)
    }
    return true
  })
  .test('cnpj', t('invalid CNPJ'), (value) => {
    if (value && (mode === 'cnpj' || size(trimMask(value || '')) > 11)) {
      return cnpj.isValid(value)
    }
    return true
  })
