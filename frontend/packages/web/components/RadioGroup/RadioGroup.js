import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import RadioGroupForm from './RadioGroupForm'
import RadioGroupStyled from './RadioGroupStyled'

const RadioGroup = forwardRef((props, ref) => {
  const { detached, ...rest } = props

  const Input = useMemo(
    () => detached ? RadioGroupStyled : RadioGroupForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

RadioGroup.propTypes = {
  detached: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

RadioGroup.defaultProps = {
  detached: false,
  value: ''
}

export default RadioGroup
