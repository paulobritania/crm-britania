import React, { useCallback } from 'react'

import PropTypes from 'prop-types'

import stateRegistrationMask from '@britania-crm/forms/masks/stateRegistration.mask'
import TextField from '@britania-crm/web-components/TextField'

const InputStateRegistration = ({
  state, disabled, ...props
}) => {
  const setMask = useCallback(
    (value) => stateRegistrationMask(value, { state }),
    [state]
  )

  return (
    <TextField
      { ...props }
      type="tel"
      setMask={ setMask }
      disabled={ disabled }
    />
  )
}

InputStateRegistration.propTypes = {
  state: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

InputStateRegistration.defaultProps = { disabled: false }

export default InputStateRegistration
