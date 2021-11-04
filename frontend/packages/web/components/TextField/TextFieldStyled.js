import React, { useMemo, useCallback, forwardRef, memo } from 'react'
import MaskedInput from 'react-input-mask'
import NumberFormat from 'react-number-format'

import PropTypes from 'prop-types'
import uuid from 'short-uuid'

import toNumber from 'lodash/toNumber'

import Box from '@material-ui/core/Box'
import { ThemeProvider } from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info'

import { areEqual } from '@britania-crm/utils/memo'

import {
  theme as MuiTheme,
  TextFieldStyled as MuiTextFieldStyled
} from './styles'

const TextFieldStyled = forwardRef((props, inputRef) => {
  const {
    id,
    numberFormatProps,
    mask,
    value,
    onChange,
    onKeyDown,
    onBlur,
    required,
    disabled,
    error,
    helperText: externalHelperText,
    className,
    setMask,
    transformRender,
    minWidth,
    notEditable,
    readOnly,
    type,
    theme,
    inputProps,
    maxLength,
    ...rest
  } = props

  const ArrayErros = [];
  if (externalHelperText) {
    if (externalHelperText == 'CPF já cadastrado em outra Matriz') {
      ArrayErros.push(externalHelperText);
    }
  }

  const hasError = ArrayErros.length >= 1;

  const inputId = useMemo(() => id || uuid().new(), [id])

  const handleChange = useCallback(
    (event) => {
      if (!notEditable) {
        if (numberFormatProps) {
          return onChange({ target: { value: event.value } })
        }
        return onChange(event)
      }
      return undefined
    },
    [notEditable, numberFormatProps, onChange]
  )

  const helperText = useMemo(
    () =>
      (error || externalHelperText) && (
        <Box component='span' display='flex' alignItems='center' style={{color: hasError && 'red'}}>
          <InfoIcon fontSize='small' style={{ marginRight: '8px' }} />{' '}
          {error || externalHelperText}
        </Box>
      ),
    [error, externalHelperText]
  )

  const textFieldProps = useMemo(
    () => ({
      inputRef,
      id: inputId,
      required,
      minWidth,
      error: !!error,
      helperText,
      disabled,
      readOnly,
      type,
      inputProps: {
        maxLength,
        ...inputProps
      },
      ...rest
    }),
    [
      inputRef,
      inputId,
      required,
      minWidth,
      error,
      helperText,
      disabled,
      readOnly,
      type,
      maxLength,
      inputProps,
      rest
    ]
  )

  const transformedValue = useMemo(
    () => transformRender(type === 'tel' && value ? value.toString() : value),
    [transformRender, type, value]
  )

  return (
    <ThemeProvider theme={MuiTheme(theme)}>
      {numberFormatProps ? (
        <NumberFormat
          value={transformedValue ? toNumber(transformedValue) : ''}
          onValueChange={handleChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          customInput={MuiTextFieldStyled}
          {...numberFormatProps}
          {...textFieldProps}
        />
      ) : (
        <>
          {textFieldProps.multiline || !mask ? (
            <MuiTextFieldStyled
              {...textFieldProps}
              value={transformedValue}
              onChange={handleChange}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              disabled={disabled}
              readOnly={readOnly}
            />
          ) : (
            <MaskedInput
              mask={mask}
              onChange={handleChange}
              value={transformedValue}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              maskPlaceholder={null}
              disabled={disabled}
              readOnly={readOnly}
            >
              <MuiTextFieldStyled
                {...textFieldProps}
                value={transformedValue}
              />
            </MaskedInput>
          )}
        </>
      )}
    </ThemeProvider>
  )
})

TextFieldStyled.propTypes = {
  id: PropTypes.string,
  numberFormatProps: PropTypes.object,
  mask: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  value: PropTypes.any,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  setMask: PropTypes.func,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  helperText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.object
  ]),
  type: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  transformRender: PropTypes.func,
  minWidth: PropTypes.number,
  notEditable: PropTypes.bool,
  readOnly: PropTypes.bool,
  theme: PropTypes.object,
  inputProps: PropTypes.object,
  maxLength: PropTypes.number
}

TextFieldStyled.defaultProps = {
  id: undefined,
  numberFormatProps: undefined,
  mask: undefined,
  onBlur() {},
  onKeyDown() {},
  setMask: undefined,
  required: false,
  className: null,
  error: null,
  disabled: false,
  helperText: null,
  type: 'text',
  variant: 'outlined',
  size: 'small',
  value: '',
  onChange() {},
  transformRender: (v) => v,
  minWidth: 0,
  notEditable: false,
  readOnly: false,
  theme: {},
  inputProps: {},
  maxLength: undefined
}

export default memo(TextFieldStyled, areEqual)
