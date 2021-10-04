import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle
} from 'react'

import PropTypes from 'prop-types'

import useField from '../hooks/useField'

const FieldComponent = forwardRef((props, fieldRef) => {
  const {
    Component,
    transformValue,
    onValueChange,
    touchOnChange,
    defaultValue,
    transformRender,
    ...rest
  } = props

  const {
    id,
    setTouched,
    handleChangeNative,
    imperativeHandles,
    required
  } = useField()

  const [value, setValue] = useState(defaultValue)

  const mounted = useRef(null)
  const inputRef = useRef(null)

  const transformedValue = useMemo(
    () => transformRender(value),
    [value, transformRender]
  )

  useEffect(() => {
    const newValue = transformValue(value)
    const originalMounted = mounted.current
    if (mounted.current) {
      if (touchOnChange) {
        setTouched(true)
      }
      handleChangeNative(newValue)
    } else {
      mounted.current = true
    }
    onValueChange(newValue, originalMounted)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useImperativeHandle(fieldRef, () => ({
    ...inputRef.current,
    ...imperativeHandles,
    value,
    setValue
  }), [imperativeHandles, value, setValue])

  return (
    <Component
      id={ id }
      required={ required }
      { ...rest }
      value={ transformedValue }
      setValue={ setValue }
    />
  )
})

FieldComponent.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]).isRequired,
  defaultValue: PropTypes.any,
  transformValue: PropTypes.func,
  transformRender: PropTypes.func,
  onValueChange: PropTypes.func,
  touchOnChange: PropTypes.bool
}

FieldComponent.defaultProps = {
  Component: () => null,
  defaultValue: undefined,
  transformValue: (v) => v,
  transformRender: (v) => v,
  onValueChange () {},
  touchOnChange: false
}

export default FieldComponent
