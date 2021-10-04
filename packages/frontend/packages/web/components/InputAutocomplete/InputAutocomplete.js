import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import InputAutocompleteForm from './InputAutocompleteForm'
import InputAutocompleteStyled from './InputAutocompleteStyled'

const InputAutocomplete = forwardRef((props, ref) => {
  const {
    detached,
    ...rest
  } = props

  const Input = useMemo(
    () => detached ? InputAutocompleteStyled : InputAutocompleteForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

InputAutocomplete.propTypes = { detached: PropTypes.bool }

InputAutocomplete.defaultProps = { detached: false }

export default InputAutocomplete
