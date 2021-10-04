import React from 'react'

import PropTypes from 'prop-types'

import numberMask from '@britania-crm/forms/masks/number.mask'
import TextField from '@britania-crm/web-components/TextField'

const InputNumber = (props) => {
  const { mask, ...rest } = props
  return <TextField setMask={ mask } { ...rest } type="tel" />
}

InputNumber.propTypes = {
  /** Defines mask characters's limit  */
  maxLength: PropTypes.number,
  mask: PropTypes.func
}

InputNumber.defaultProps = {
  maxLength: 10,
  mask: numberMask
}

export default InputNumber
