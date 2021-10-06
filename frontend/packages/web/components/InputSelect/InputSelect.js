import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import InputSelectForm from './InputSelectForm'
import InputSelectStyled from './InputSelectStyled'

const InputSelect = forwardRef((props, ref) => {
  const {
    detached,
    ...rest
  } = props

  const Input = useMemo(
    () => detached ? InputSelectStyled : InputSelectForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

InputSelect.propTypes = {
  detached: PropTypes.bool,
  value: PropTypes.any
}

InputSelect.defaultProps = {
  detached: false,
  value: ''
}

export default InputSelect
