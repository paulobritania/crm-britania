import React, { useCallback } from 'react'

import PropTypes from 'prop-types'

import cpfCnpjMask from '@britania-crm/forms/masks/cpfCnpj.mask'
import TextField from '@britania-crm/web-components/TextField'

const InputCpfCnpj = ({ mode, ...props }) => {
  const setMask = useCallback(
    (value) => cpfCnpjMask(value, { mode }),
    [mode]
  )

  return (
    <TextField
      { ...props }
      type="tel"
      setMask={ setMask }
    />
  )
}

InputCpfCnpj.propTypes = { mode: PropTypes.oneOf(['cpf', 'cnpj', 'both']) }

InputCpfCnpj.defaultProps = { mode: 'both' }

export default InputCpfCnpj
