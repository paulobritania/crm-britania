import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { TextField, InputLabel } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'

import { Controller } from 'react-hook-form'

import MaskedInput from 'react-input-mask'
import cpfCnpjMask from '@britania-crm/forms/masks/cpfCnpj.mask'

import { theme } from './styles'

const Input = ({
  name,
  control,
  label,
  variant,
  mode,
  readonly,
  rows,
  multiline,
  placeholder,
  mask,
  maxLenght,
  ...rest
}) => {
  return (
    <>
      <InputLabel style={{ margin: '5px auto', color: '#1F2D3D' }}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState
        }) =>
          !mask ? (
            <ThemeProvider theme={theme}>
              <TextField
                helperText={error ? error.message : null}
                size='small'
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
                variant={variant}
                inputProps={{ readOnly: readonly, maxLength: maxLenght }}
                placeholder={placeholder}
                multiline={multiline}
                rows={rows}
              />
            </ThemeProvider>
          ) : (
            <MaskedInput
              mask={mask}
              variant={variant}
              value={value}
              onChange={onChange}
            >
              <TextField
                helperText={error ? error.message : null}
                size='small'
                error={!!error}
                fullWidth
                variant={variant}
                inputProps={{ readOnly: readonly }}
                placeholder={placeholder}
              />
            </MaskedInput>
          )
        }
      />
    </>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any,
  label: PropTypes.string,
  variant: PropTypes.string,
  mask: PropTypes.bool,
  mode: PropTypes.string,
  multiline: PropTypes.bool
}

Input.defaultProps = {
  name: '',
  label: '',
  variant: 'outlined',
  mask: false,
  mode: 'both',
  multiline: false
}

export default Input
