import React, {
  forwardRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'

import RichTextEditorStyled from './RichTextEditorStyled'

const RichTextEditorForm = (props) => {
  const {
    setValue,
    ...rest
  } = props

  const {
    fieldRef,
    required,
    handleBlur,
    error
  } = useField()

  const handleChange = useCallback(
    (value) => setValue(value),
    [setValue]
  )

  return (
    <RichTextEditorStyled
      ref={ fieldRef }
      { ...rest }
      onChange={ handleChange }
      onBlur={ handleBlur }
      error={ error }
      required={ required }
    />
  )
}

RichTextEditorForm.propTypes = { setValue: PropTypes.func.isRequired }

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ RichTextEditorForm }
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
  validateOnBlur: PropTypes.bool
}

Field.defaultProps = {
  disabled: false,
  onChange () {},
  onValueChange () {},
  onBlur () {},
  path: 'value',
  defaultValue: '',
  validateOnBlur: true
}

export default Field
