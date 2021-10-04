import React, {
  forwardRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'

import StatusSwitchStyled from './StatusSwitchStyled'

const StatusSwitchForm = (props) => {
  const {
    setValue,
    ...rest
  } = props

  const { fieldRef } = useField()

  const handleChange = useCallback(
    (event) =>
      setValue(event.target.checked),
    [setValue]
  )

  return (
    <StatusSwitchStyled
      ref={ fieldRef }
      { ...rest }
      onChange={ handleChange }
    />
  )
}

StatusSwitchForm.propTypes = { setValue: PropTypes.func.isRequired }

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ StatusSwitchForm }
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
  defaultValue: false,
  validateOnBlur: true
}

export default Field
