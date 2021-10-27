import React, {
  forwardRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'

import InputAutocompleteStyled from './InputAutocompleteStyled'

const InputAutocompleteForm = (props) => {
  const {
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
    (val) => setValue(val),
    [setValue]
  )

  return (
    <InputAutocompleteStyled
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

InputAutocompleteForm.propTypes = { setValue: PropTypes.func.isRequired }

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ InputAutocompleteForm }
  />
))

Field.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onValueChange: PropTypes.func,
  path: PropTypes.string,
  defaultValue: PropTypes.any,
  helperText: PropTypes.string,
  validateOnBlur: PropTypes.bool
}

Field.defaultProps = {
  disabled: false,
  onChange () {},
  onValueChange () {},
  onBlur () {},
  path: 'value',
  defaultValue: {},
  helperText: null,
  validateOnBlur: true
}

export default Field
