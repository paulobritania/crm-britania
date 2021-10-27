import React, {
  forwardRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'

import UploadImageStyled from './UploadImageStyled'

const UploadImageForm = (props) => {
  const {
    setValue,
    ...rest
  } = props

  const {
    error,
    handleBlur,
    required
  } = useField()

  const handleChange = useCallback(
    (val) => setValue(val),
    [setValue]
  )

  return (
    <UploadImageStyled
      { ...rest }
      onChange={ handleChange }
      onBlur={ handleBlur }
      error={ error }
      required={ required }
    />
  )
}

UploadImageForm.propTypes = { setValue: PropTypes.func.isRequired }

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ UploadImageForm }
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
  transformValue: (v) => v,
  onValueChange () {},
  onBlur () {},
  path: 'value',
  defaultValue: '',
  helperText: null
}

export default Field
