import React from 'react'

import PropTypes from 'prop-types'

import InputAdornment from '@material-ui/core/InputAdornment'
import PersonIcon from '@material-ui/icons/Person'

import colors from '@britania-crm/styles/colors'
import TextField from '@britania-crm/web-components/TextField'

const InputUsername = ({
  InputProps,
  ...props
}) => (
  <TextField
    { ...props }
    InputProps={ {
      ...InputProps,
      startAdornment: (
        <InputAdornment position="start">
          <PersonIcon style={ { color: colors.secondary.main } } />
        </InputAdornment>
      )
    } }
    type="text"
  />
)

InputUsername.propTypes = { InputProps: PropTypes.object }

InputUsername.defaultProps = { InputProps: {} }

export default InputUsername
