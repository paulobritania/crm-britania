import React, {
  forwardRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'

import CheckboxStyled from './CheckboxStyled'

const CheckboxForm = (props) => {
  const {
    setValue,
    ...rest
  } = props

  const {
    error,
    fieldRef
  } = useField()

  const handleChange = useCallback(
    (event) => setValue(event.target.checked),
    [setValue]
  )

  return (
    <CheckboxStyled
      ref={ fieldRef }
      { ...rest }
      onChange={ handleChange }
      error={ error }
    />
  )
}

CheckboxForm.propTypes = { setValue: PropTypes.func.isRequired }

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ CheckboxForm }
  />
))

Field.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  transformValue: PropTypes.func,
  onValueChange: PropTypes.func,
  path: PropTypes.string,
  defaultValue: PropTypes.any,
  validateOnBlur: PropTypes.bool
}

Field.defaultProps = {
  disabled: false,
  onChange () {},
  transformValue: (v) => v,
  onValueChange () {},
  onBlur () {},
  path: 'value',
  defaultValue: false,
  validateOnBlur: true
}

export default Field
