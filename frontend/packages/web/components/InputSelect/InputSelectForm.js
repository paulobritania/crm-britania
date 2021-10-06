import React, {
  forwardRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'

import InputSelectStyled from './InputSelectStyled'

const InputSelectForm = (props) => {
  const {
    setValue,
    ...rest
  } = props

  const { fieldRef, error } = useField()

  const handleChange = useCallback(
    (event) => {
      setValue(event.target.value)
    },
    [setValue]
  )

  return (
    <InputSelectStyled
      ref={ fieldRef }
      { ...rest }
      onChange={ handleChange }
      error={ error }
    />
  )
}

InputSelectForm.propTypes = { setValue: PropTypes.func.isRequired }

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ InputSelectForm }
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
  helperText: PropTypes.string
}

Field.defaultProps = {
  disabled: false,
  onChange () {},
  onValueChange () {},
  onBlur () {},
  path: 'value',
  defaultValue: '',
  helperText: null
}

export default Field
