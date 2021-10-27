import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import BadgesForm from './BadgesForm'
import BadgesStyled from './BadgesStyled'

const Badges = forwardRef((props, ref) => {
  const {
    detached,
    ...rest
  } = props

  const Input = useMemo(
    () => detached ? BadgesStyled : BadgesForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

Badges.propTypes = {
  detached: PropTypes.bool,
  value: PropTypes.any
}

Badges.defaultProps = {
  detached: false,
  value: []
}

export default Badges
