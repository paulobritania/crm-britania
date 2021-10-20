import React, {
  forwardRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'

import InputDateRangeStyled from './InputDateRangeStyled'

const InputDateRangeForm = (props) => {
  const {
    setValue,
    ...rest
  } = props

  const { error, required } = useField()

  const handleChange = useCallback(
    (newDates) => setValue(newDates),
    [setValue]
  )

  return (
    <InputDateRangeStyled
      { ...rest }
      onChange={ handleChange }
      error={ error }
      required={ required }
    />
  )
}

InputDateRangeForm.propTypes = { setValue: PropTypes.func.isRequired }

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ InputDateRangeForm }
    touchOnChange
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
  defaultValue: {
    from: '',
    to: ''
  },
  validateOnBlur: true
}

export default Field
