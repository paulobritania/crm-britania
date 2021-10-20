import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import SwitchForm from './SwitchForm'
import SwitchStyled from './SwitchStyled'

const Switch = forwardRef((props, ref) => {
  const { detached, ...rest } = props

  const Input = useMemo(
    () => detached ? SwitchStyled : SwitchForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

Switch.propTypes = {
  detached: PropTypes.bool,
  value: PropTypes.bool
}

Switch.defaultProps = {
  detached: false,
  value: false
}

export default Switch
