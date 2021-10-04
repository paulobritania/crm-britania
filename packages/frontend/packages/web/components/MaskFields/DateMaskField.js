import React, { useMemo } from 'react'
import MaskedInput from 'react-text-mask'

import PropTypes from 'prop-types'

const DateMaskField = ({
  inputRef, value, ...other
}) => {
  const mask = useMemo(
    () => [/\d/, /\d/, '/', /\d/, /\d/]
    ,
    []
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

DateMaskField.propTypes = {
  inputRef: PropTypes.func.isRequired,
  value: PropTypes.string
}

DateMaskField.defaultProps = { value: '' }

export default DateMaskField
