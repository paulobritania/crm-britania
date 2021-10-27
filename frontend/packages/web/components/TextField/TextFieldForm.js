import React, {
  forwardRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'

import TextFieldStyled from './TextFieldStyled'

const TextFieldForm = (props) => {
  const {
    zIndex,
    setValue,
    ...rest
  } = props

  const {
    mask,
    error,
    fieldRef,
    handleBlur,
    required
  } = useField()

  const handleChange = useCallback(
    (event) => setValue(event.target.value),
    [setValue]
  )

  return (
    <TextFieldStyled
      ref={ fieldRef }
      { ...rest }
      onChange={ handleChange }
      onBlur={ handleBlur }
      mask={ mask }
      error={ error }
      required={ required }
    />
  )
}

TextFieldForm.propTypes = {
  setValue: PropTypes.func.isRequired,
  zIndex: PropTypes.number
}

TextFieldForm.defaultProps = { zIndex: undefined }

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ TextFieldForm }
  />
))

Field.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  path: PropTypes.string,
  defaultValue: PropTypes.any,
  numberFormatProps: PropTypes.object,
  helperText: PropTypes.string,
  validateOnBlur: PropTypes.bool
}

Field.defaultProps = {
  disabled: false,
  onChange () {},
  onValueChange () {},
  onBlur () {},
  path: 'value',
  defaultValue: '',
  numberFormatProps: undefined,
  helperText: null,
  validateOnBlur: true
}

export default Field
