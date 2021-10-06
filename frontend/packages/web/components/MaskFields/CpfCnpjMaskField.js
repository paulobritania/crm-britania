import React, { useMemo } from 'react'
import MaskedInput from 'react-text-mask'

import PropTypes from 'prop-types'

import size from 'lodash/size'

import { trimMask } from '@britania-crm/utils/formatters'

const CpfCnpjMaskField = ({
  inputRef,
  value,
  mode,
  ...other
}) => {
  const placeholderChar = '\u2000'

  const mask = useMemo(
    () => {
      const cpfSize = 11 // without mask
      const valueTrim = trimMask(value || '')
      const isCpf = size(valueTrim) <= cpfSize
      if (mode === 'cpf' || (mode !== 'cnpj' && isCpf)) {
        // CPF mask
        // the last digit enables the mask to change to CNPJ
        const cpfArr = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
        if (mode === 'both') {
          cpfArr.push(/\d/)
        }
        return cpfArr
      }
      // CNPJ mask
      return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    },
    [mode, value]
  )

  return (
    <MaskedInput
      { ...other }
      value={ value }
      ref={ (ref) => inputRef(ref ? ref.inputElement : null) }
      mask={ mask }
      placeholderChar={ placeholderChar }
    />
  )
}

CpfCnpjMaskField.propTypes = {
  inputRef: PropTypes.func.isRequired,
  value: PropTypes.string,
  mode: PropTypes.oneOf(['cpf', 'cnpj', 'both']).isRequired
}

CpfCnpjMaskField.defaultProps = { value: '' }

export default CpfCnpjMaskField
