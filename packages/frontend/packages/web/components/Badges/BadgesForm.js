import React, {
  forwardRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'

import BadgesStyled from './BadgesStyled'

const BadgesForm = (props) => {
  const {
    setValue,
    ...rest
  } = props

  const { fieldRef } = useField()

  const handleChange = useCallback(
    (val) => setValue(val),
    [setValue]
  )

  return (
    <BadgesStyled
      ref={ fieldRef }
      { ...rest }
      onChange={ handleChange }
    />
  )
}

BadgesForm.propTypes = { setValue: PropTypes.func.isRequired }

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ BadgesForm }
  />
))

Field.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onBlur: PropTypes.func,
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
  defaultValue: [],
  helperText: null,
  validateOnBlur: true
}

export default Field
