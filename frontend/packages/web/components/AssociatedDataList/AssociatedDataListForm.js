import React, { forwardRef } from 'react'

import PropTypes from 'prop-types'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'

import AssociatedDataListStyled from './AssociatedDataListStyled'

const AssociatedDataListForm = (props) => {
  const {
    zIndex,
    setValue,
    value,
    ...rest
  } = props

  const {
    error,
    required
  } = useField()

  return (
    <AssociatedDataListStyled
      { ...rest }
      value={ value }
      error={ error }
      required={ required }
    />
  )
}

AssociatedDataListForm.propTypes = {
  setValue: PropTypes.func.isRequired,
  zIndex: PropTypes.number,
  value: PropTypes.any
}

AssociatedDataListForm.defaultProps = {
  zIndex: undefined,
  value: []
}

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ AssociatedDataListForm }
    touchOnChange
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
  defaultValue: [],
  numberFormatProps: undefined,
  helperText: null,
  validateOnBlur: true
}

export default Field
