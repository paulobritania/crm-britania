import React from 'react'

import PropTypes from 'prop-types'

import TextField from '@britania-crm/web-components/TextField'

const InputFloat = ({
  maxLength, decimalScale, ...rest
}) => (
  <TextField
    { ...rest }
    numberFormatProps={ {
      decimalScale,
      fixedDecimalScale: true,
      thousandSeparator: '.',
      decimalSeparator: ','
    } }
    inputProps={ { maxLength } }
    type="tel"
    onFocus={ (event) => event.target.select() }
  />
)

InputFloat.propTypes = {
  maxLength: PropTypes.number,
  decimalScale: PropTypes.number
}

InputFloat.defaultProps = {
  maxLength: undefined,
  decimalScale: 2
}

export default InputFloat
