import React, {
  forwardRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import {
  FieldProvider,
  useField
} from '@britania-crm/forms'

import TransferListStyled from './TransferListStyled'

const TransferListForm = (props) => {
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
    <TransferListStyled
      ref={ fieldRef }
      { ...rest }
      onChange={ handleChange }
    />
  )
}

TransferListForm.propTypes = { setValue: PropTypes.func.isRequired }

const Field = forwardRef(({ path, ...props }, ref) => (
  <FieldProvider
    ref={ ref }
    { ...props }
    registerFieldOptions={ { path } }
    FieldComponent={ TransferListForm }
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
  defaultValue: [],
  helperText: null
}

export default Field
