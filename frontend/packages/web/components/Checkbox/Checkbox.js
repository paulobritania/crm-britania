import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import CheckboxForm from './CheckboxForm'
import CheckboxStyled from './CheckboxStyled'

const Checkbox = forwardRef((props, ref) => {
  const { detached, ...rest } = props

  const Input = useMemo(
    () => detached ? CheckboxStyled : CheckboxForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

Checkbox.propTypes = {
  detached: PropTypes.bool,
  value: PropTypes.bool
}

Checkbox.defaultProps = {
  detached: false,
  value: false
}

export default Checkbox
