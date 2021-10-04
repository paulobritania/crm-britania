import React, { useState } from 'react'

import PropTypes from 'prop-types'

import InputAdornment from '@material-ui/core/InputAdornment'

import colors from '@britania-crm/styles/colors'
import EyeClosedIconButton from '@britania-crm/web-components/IconButton/EyeClosedIconButton'
import ViewIconButton from '@britania-crm/web-components/IconButton/ViewIconButton'
import KeyIcon from '@britania-crm/web-components/Icons/KeyIcon'
import TextField from '@britania-crm/web-components/TextField'

const InputPassword = ({
  size,
  InputProps,
  ...props
}) => {
  const [passwordMasked, setPasswordMasked] = useState(true)

  const EyeIconButton = passwordMasked ? ViewIconButton : EyeClosedIconButton

  return (
    <TextField
      size={ size }
      { ...props }
      InputProps={ {
        ...InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <KeyIcon style={ { color: colors.secondary.main } } />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <EyeIconButton
              size={ size }
              onClick={ () => setPasswordMasked((old) => !old) }
              style={ { color: colors.britSupport1.light } }
            />
          </InputAdornment>
        )
      } }
      type={ passwordMasked ? 'password' : 'text' }
    />
  )
}

InputPassword.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  InputProps: PropTypes.object
}

InputPassword.defaultProps = {
  size: 'small',
  InputProps: {}
}

export default InputPassword
