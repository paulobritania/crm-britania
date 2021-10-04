import React, { useMemo } from 'react'
import MaskedInput from 'react-text-mask'

import PropTypes from 'prop-types'

import size from 'lodash/size'

import { trimMask } from '@britania-crm/utils/formatters'

const TelephoneMaskField = ({
  inputRef, value, ...other
}) => {
  const mask = useMemo(
    () => {
      const valueWithoutMask = trimMask(value || '')
      if (size(valueWithoutMask) < 11) {
        return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/]
      }
      return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    },
    [value]
  )

  return (
    <MaskedInput
      { ...other }
      value={ value }
      ref={ (ref) => inputRef(ref ? ref.inputElement : null) }
      mask={ mask }
      placeholderChar={ '\u2000' }
    />
  )
}

TelephoneMaskField.propTypes = {
  inputRef: PropTypes.func.isRequired,
  value: PropTypes.string
}

TelephoneMaskField.defaultProps = { value: '' }

export default TelephoneMaskField
