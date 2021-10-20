import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import InputDateRangeForm from './InputDateRangeForm'
import InputDateRangeStyled from './InputDateRangeStyled'

const InputDateRange = forwardRef((props, ref) => {
  const { detached, ...rest } = props

  const Input = useMemo(
    () => detached ? InputDateRangeStyled : InputDateRangeForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

InputDateRange.propTypes = {
  detached: PropTypes.bool,
  value: PropTypes.object
}

InputDateRange.defaultProps = {
  detached: false,
  value: {
    from: '',
    to: ''
  }
}

export default InputDateRange
