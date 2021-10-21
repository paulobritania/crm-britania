import size from 'lodash/size'

import { trimMask } from '@britania-crm/utils/formatters'

export default (value = '', { mode }) => {
  const cpfSize = 11 // without mask
  const valueTrim = trimMask(value || '')
  const isCpf = size(valueTrim) <= cpfSize
  if (mode === 'cpf' || (mode !== 'cnpj' && isCpf)) {
    // CPF mask
    // the last digit enables the mask to change to CNPJ
    return `999.999.999-99${ mode === 'both' ? '999' : '' }`
  }
  // CNPJ mask
  return '99.999.999/9999-99'
}
