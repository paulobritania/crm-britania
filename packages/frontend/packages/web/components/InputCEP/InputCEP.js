import React, {
  useCallback,
  useRef,
  useState,
  useEffect
} from 'react'

import PropTypes from 'prop-types'

import CircularProgress from '@material-ui/core/CircularProgress'
import InputAdornment from '@material-ui/core/InputAdornment'

import cepMask from '@britania-crm/forms/masks/cep.mask'
import { searchCep } from '@britania-crm/services/apis/brasilApi'
import TextField from '@britania-crm/web-components/TextField'

const InputCep = (props) => {
  const {
    onChange,
    onAddressChange,
    ...rest
  } = props

  const [loading, setLoading] = useState(false)

  const fieldRef = useRef(null)
  const mounted = useRef(false)

  const handleChange = useCallback(
    async (event) => {
      const { value } = event.target
      onChange(value)
      if (value?.length === 9) {
        if (fieldRef?.current?.setCustomError) {
          fieldRef.current.setCustomError(null)
        }
        try {
          setLoading(true)
          const address = await searchCep(value)
          if (mounted.current) {
            onAddressChange(address)
            setLoading(false)
          }
        } catch (err) {
          if (fieldRef?.current?.setCustomError) {
            fieldRef.current.setCustomError(err.message)
          }
          if (mounted.current) {
            setLoading(false)
          }
        }
      } else if (fieldRef?.current?.customError) {
        fieldRef.current.setCustomError(null)
      }
    },
    [onAddressChange, onChange]
  )

  useEffect(
    () => {
      mounted.current = true
      return () => {
        mounted.current = false
      }
    },
    []
  )

  return (
    <TextField
      ref={ fieldRef }
      { ...rest }
      type="tel"
      setMask={ cepMask }
      onChange={ handleChange }
      InputProps={ {
        endAdornment: (
          <InputAdornment position="end">
            {loading && (
              <CircularProgress
                color="inherit"
                size={ 18 }
              />
            ) }
          </InputAdornment>
        )
      } }
    />
  )
}

InputCep.propTypes = {
  onChange: PropTypes.func,
  onAddressChange: PropTypes.func
}

InputCep.defaultProps = {
  onChange () {},
  onAddressChange () {}
}

export default InputCep
