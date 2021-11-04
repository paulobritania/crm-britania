import React from 'react'

import PropTypes from 'prop-types'

import { ThemeProvider } from '@material-ui/core/styles'

import { TextField } from '@material-ui/core'

import { Controller } from 'react-hook-form'

import MaskedInput from 'react-input-mask'
import cpfCnpjMask from '@britania-crm/forms/masks/cpfCnpj.mask'

import { theme as MuiTheme, InputLabelStyled } from './styles'

const Input = ({ name, control, label, variant, theme, mask, mode }) => {
  return (
    <ThemeProvider theme={MuiTheme(theme)}>
      <InputLabelStyled>{label}</InputLabelStyled>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState
        }) =>
          !mask ? (
            <TextField
              helperText={error ? error.message : null}
              size='small'
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              label={label}
              variant='outlined'
            />
          ) : (
            <MaskedInput
              mask={cpfCnpjMask('', { mode })}
              variant={variant}
              value={value}
              onChange={onChange}
            >
              <TextField
                helperText={error ? error.message : null}
                size='small'
                error={!!error}
                fullWidth
                label={label}
                variant='outlined'
              />
            </MaskedInput>
          )
        }
      />
      {/* {!mask ? (
      <MuiTextFieldStyled
        {...rest}
        disabled={disabled}
        multiline={multiline}
        variant={variant}
      />
    ) : (
      <MaskedInput
        mask={cpfCnpjMask('', { mode })}
        disabled={disabled}
        variant={variant}
      >
        <MuiTextFieldStyled name={name} {...rest} multiline={multiline} />
      </MaskedInput>
    )} */}
    </ThemeProvider>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any,
  label: PropTypes.string,
  variant: PropTypes.string,
  mask: PropTypes.bool,
  mode: PropTypes.string
}

Input.defaultProps = {
  name: '',
  label: '',
  variant: 'outlined',
  mask: false,
  mode: 'both'
}

export default Input
