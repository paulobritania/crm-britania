import React from 'react'
import MaskedInput from 'react-text-mask'

import PropTypes from 'prop-types'

const CepMaskField = ({
  inputRef, value, ...other
}) => (
  <MaskedInput
    { ...other }
    value={ value }
    ref={ (ref) => inputRef(ref ? ref.inputElement : null) }
    mask={ [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/] }
    placeholderChar={ '\u2000' }
  />
)

CepMaskField.propTypes = {
  inputRef: PropTypes.func.isRequired,
  value: PropTypes.string
}

CepMaskField.defaultProps = { value: '' }

export default CepMaskField
