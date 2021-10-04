import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  useContext,
  memo
} from 'react'

import {
  useField as useUnformField,
  FormContext as UnformContext
} from '@unform/core'
import PropTypes from 'prop-types'
import uuid from 'short-uuid'
import * as Yup from 'yup'

import debounce from 'lodash/debounce'
import first from 'lodash/first'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import map from 'lodash/map'
import set from 'lodash/set'

import { FieldContext } from '../hooks/useField'
import useForm from '../hooks/useForm'
import validateDataBySchema from '../utils/validateDataBySchema'
import FieldComponent from './FieldComponent'

const FieldProvider = forwardRef((props, ref) => {
  const {
    name,
    onChange: externalOnChange,
    onBlur,
    setMask: externalSetMask,
    FieldComponent: ExternalFieldComponent,
    registerFieldOptions: externalRegisterFieldOptions,
    validateOnBlur,
    defaultValue: externalDefaultValue,
    touchOnChange,
    ...otherProps
  } = props

  const fieldRef = useRef(null)

  const getMask = useCallback(
    (val = '') => {
      if (externalSetMask) {
        const newMask = externalSetMask(val, otherProps)
        if (!isEmpty(newMask)) {
          return newMask
        }
      }
      return undefined
    },
    [externalSetMask, otherProps]
  )

  const [mounted, setMounted] = useState(false)
  const [touched, setTouched] = useState(false)
  const [mask, setMask] = useState(getMask())
  const [customError, setCustomError] = useState(null)

  const { unregisterField } = useContext(UnformContext)

  const {
    formRef,
    schema,
    needSchema,
    getFieldZIndex,
    getFieldOrder,
    registerFieldName,
    unregisterFieldName,
    defaultValues
  } = useForm()

  const order = useMemo(() => getFieldOrder(), [getFieldOrder])
  const zIndex = useMemo(() => getFieldZIndex(), [getFieldZIndex])

  const {
    fieldName,
    registerField,
    defaultValue: unformDefaultValue,
    error,
    clearError
  } = useUnformField(name)

  const id = useMemo(
    () => `${ fieldName }-${ uuid().new() }`,
    [fieldName]
  )

  const defaultValue = useMemo(
    () => {
      if (unformDefaultValue) {
        return unformDefaultValue
      }
      const defaultValueByForm = get(defaultValues, fieldName)
      if (defaultValueByForm !== undefined) {
        return defaultValueByForm
      }
      return externalDefaultValue
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const registerFieldOptions = useMemo(
    () => (
      isFunction(externalRegisterFieldOptions)
        ? externalRegisterFieldOptions(fieldRef)
        : externalRegisterFieldOptions
    ),
    [externalRegisterFieldOptions]
  )

  const fieldSchema = useMemo(
    () => {
      try {
        if (needSchema) {
          return Yup.reach(schema, fieldName)
        }
        // form without schema constructor
        return null
      } catch (err) {
        // field view not found on schema
        return null
      }
    },
    [fieldName, schema, needSchema]
  )

  const required = useMemo(
    () => fieldSchema?.exclusiveTests?.required || false,
    [fieldSchema]
  )

  const setError = useCallback(
    (err) => {
      if (formRef?.current?.setFieldError) {
        // TODO: setar erro por campo no unform não é performatico em formulários grandes
        // ISSUE: https://github.com/unform/unform/issues/308
        formRef.current.setFieldError(fieldName, err)
      }
    },
    [fieldName, formRef]
  )

  const doValidateField = useCallback(
    debounce(
      async (value, resolve) => {
        try {
          if (formRef?.current) {
            const formData = formRef.current.getData() || {}
            if (value === undefined) {
              value = formRef?.current?.getFieldValue(fieldName) || ''
            }

            const oldError = formRef?.current?.getFieldError(fieldName)

            await validateDataBySchema({
              data: {
                ...formData,
                [fieldName]: value
              },
              schema: Yup.object().shape({ [fieldName]: fieldSchema })
            })
            if (oldError) {
              setError(null)
            }
            if (customError) {
              throw new Error(customError)
            }
            resolve()
          }
        } catch (err) {
          if (err.formError) {
            const objErrors = {}
            forEach(err.messages, (message, name) => {
              set(objErrors, name, message)
            })
            const formError = first(map(objErrors))
            setError(formError)
            resolve(formError)
          } else {
            setError(err.message)
            resolve(err.message)
          }
        }
      },
      500
    ),
    [customError, fieldName, fieldSchema, formRef, setError]
  )

  const validateField = useCallback(
    (value) => new Promise((resolve) => {
      doValidateField(value, resolve)
    }),
    [doValidateField]
  )

  const handleChange = useCallback(
    async (event) => {
      if (externalSetMask) {
        setMask(getMask(event.target[registerFieldOptions.path]))
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      externalSetMask,
      registerFieldOptions.path
    ]
  )

  const handleBlur = useCallback(
    (event) => {
      onBlur(event)
      if (formRef?.current?.getFieldValue) {
        validateField()
      }
      if (!touched) {
        setTouched(true)
      }
    },
    [formRef, onBlur, touched, validateField]
  )

  const handleChangeNative = useCallback(
    (value, ...other) => {
      if (fieldRef.current) {
        const currentFieldValue = formRef?.current.getFieldValue(fieldName)
        if (!isEqual(currentFieldValue, value)) {
          formRef.current.setFieldValue(fieldName, value, ...other)
          fieldRef.current[registerFieldOptions.path] = value
          handleChange({ target: { [registerFieldOptions.path]: value } })
        } else {
          externalOnChange({ target: { [registerFieldOptions.path]: value } }, ...other)

          if (touchOnChange) {
            validateField(value)
          }
        }
      }
    },
    [formRef, fieldName, registerFieldOptions.path, handleChange, externalOnChange, touchOnChange, validateField]
  )

  const handleBlurNative = useCallback(
    () => {
      if (fieldRef.current) {
        const value = formRef?.current.getFieldValue(fieldName)
        handleBlur({ target: { value } })
      }
    },
    [fieldName, formRef, handleBlur]
  )

  const resetField = useCallback(
    () => {
      // reset errors
      setTouched(false)
      formRef.current.clearField(fieldName)
      formRef.current.setFieldError(fieldName, null)
      setCustomError()
    },
    [fieldName, formRef]
  )

  // register unform field
  useEffect(() => {
    if (fieldSchema) {
      registerField({
        name: fieldName,
        ref: fieldRef.current,
        ...registerFieldOptions
      })
      registerFieldName(fieldName)
    }
    return () => {
      unregisterField(fieldName)
      unregisterFieldName(fieldName)
    }
    // eslint-disable-next-line
  }, [
    fieldSchema,
    fieldName,
    registerField,
    registerFieldName,
    // registerFieldOptions,
    unregisterFieldName,
    unregisterField,
    touched
  ])

  useEffect(() => {
    if (error) {
      setTouched(true)
    }
  }, [error])

  // clear field when touched return to false (reset)
  useEffect(() => {
    const fieldValue = formRef?.current?.getFieldValue(fieldName)
    if (
      !touched &&
      fieldValue !== undefined &&
      fieldValue !== fieldRef?.current?.defaultValue
    ) {
      formRef.current.clearField(fieldName)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touched, customError])

  // set mask on second render
  // because controlled fields set the default value - if it exists - on first render (didMount)
  useLayoutEffect(() => {
    if (externalSetMask) {
      const value = mounted
        ? fieldRef?.current?.[registerFieldOptions.path]
        : fieldRef?.current?.defaultValue

      setMask(getMask(value))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalSetMask, fieldRef, registerFieldOptions.path])

  useEffect(() => {
    setMounted(true)
  }, [])

  const imperativeHandles = useMemo(
    () => ({
      name,
      defaultValue,
      resetField,
      externalOnChange,
      validateField,
      setTouched,
      customError,
      setCustomError,
      touched,
      setError,
      error
    }),
    [name, defaultValue, resetField, externalOnChange, validateField, customError, touched, setError, error]
  )

  useImperativeHandle(ref, () => fieldRef?.current, [fieldRef])

  const state = useMemo(
    () => ({
      id,
      imperativeHandles,
      fieldName,
      defaultValue,
      mask,
      error,
      clearError,
      fieldRef,
      handleChange,
      handleBlur,
      handleChangeNative,
      handleBlurNative,
      required,
      formRef,
      touched,
      setTouched,
      resetField,
      externalOnChange,
      validateField,
      zIndex
    }),
    [id, imperativeHandles, fieldName, defaultValue, mask, error, clearError, handleChange, handleBlur, handleChangeNative, handleBlurNative, required, formRef, touched, resetField, externalOnChange, validateField, zIndex]
  )

  return (
    <FieldContext.Provider value={ state }>
      {(!isEmpty(fieldSchema) || !needSchema) && (
        <FieldComponent
          ref={ fieldRef }
          { ...otherProps }
          Component={ ExternalFieldComponent }
          id={ id }
          name={ name }
          defaultValue={ defaultValue }
          order={ order }
          touchOnChange={ touchOnChange }
        />
      )}
    </FieldContext.Provider>
  )
})

FieldProvider.propTypes = {
  /** this name will be used to register the field into form context */
  name: PropTypes.string.isRequired,
  /** it is the Field to be render with TextField */
  FieldComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]).isRequired,
  /** object with the Unform registerField options */
  registerFieldOptions: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  /** function that run when the input changes */
  onChange: PropTypes.func,
  /** function that run when the input blur */
  onBlur: PropTypes.func,
  /**
   * function that receive input data and configs, and return the mask to input.
   * If it is `undefined`, the input doesn't be masked
   */
  setMask: PropTypes.func,
  validateOnBlur: PropTypes.bool,
  defaultValue: PropTypes.any,
  transformValue: PropTypes.func,
  transformRender: PropTypes.func,
  onValueChange: PropTypes.func,
  touchOnChange: PropTypes.bool
}

FieldProvider.defaultProps = {
  registerFieldOptions: { path: '/' },
  onChange () {},
  onBlur () {},
  setMask: undefined,
  validateOnBlur: true,
  defaultValue: undefined,
  transformValue: (v) => v,
  transformRender: (v) => v,
  onValueChange () {},
  touchOnChange: false
}

export default memo(FieldProvider)
