import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import StatusSwitchForm from './StatusSwitchForm'
import StatusSwitchStyled from './StatusSwitchStyled'

const StatusSwitch = forwardRef((props, ref) => {
  const { detached, ...rest } = props

  const Input = useMemo(
    () => detached ? StatusSwitchStyled : StatusSwitchForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

StatusSwitch.propTypes = {
  detached: PropTypes.bool,
  value: PropTypes.bool
}

StatusSwitch.defaultProps = {
  detached: false,
  value: false
}

export default StatusSwitch
