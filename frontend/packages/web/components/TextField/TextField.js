import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import TextFieldForm from './TextFieldForm'
import TextFieldStyled from './TextFieldStyled'

const TextField = forwardRef((props, ref) => {
  const {
    detached,
    value,
    setMask,
    ...rest
  } = props

  const Input = useMemo(
    () => detached ? TextFieldStyled : TextFieldForm,
    [detached]
  )

  const mask = useMemo(
    () => {
      if (detached && setMask) {
        return setMask(value, rest)
      }
      return undefined
    },
    [detached, rest, setMask, value]
  )

  return (
    <Input
      ref={ ref }
      value={ value }
      setMask={ setMask }
      mask={ mask }
      { ...rest }
    />
  )
})

TextField.propTypes = {
  detached: PropTypes.bool,
  setMask: PropTypes.func,
  value: PropTypes.any
}

TextField.defaultProps = {
  detached: false,
  setMask: undefined,
  value: ''
}

export default TextField
