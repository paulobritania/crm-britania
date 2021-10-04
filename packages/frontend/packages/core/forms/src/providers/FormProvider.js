import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
  useState,
  useMemo,
  useEffect
} from 'react'

import { useT } from '@meta-react/i18n'
import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'
import first from 'lodash/first'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import reduce from 'lodash/reduce'
import set from 'lodash/set'

import { VALIDATION_FAILED } from '@britania-crm/constants/asyncFormValidation'

import { FormContext } from '../hooks/useForm'
import reloadSchemaUtils from '../utils/reloadSchema'
import removeEmptyValues from '../utils/removeEmptyValues'
import validateDataBySchema from '../utils/validateDataBySchema'

const FormProvider = forwardRef((props, formRef) => {
  const {
    UnformComponent,
    schemaConstructor,
    schemaProps,
    resetOnSubmit,
    onSubmit,
    defaultValues: initialValues,
    children,
    filterEmptyValues,
    onInvalidForm,
    ...otherProps
  } = props

  const t = useT()

  const unformRef = useRef(null)
  const fields = useRef([])
  const fieldsOrderCounter = useRef(0)
  const fieldsZIndexCounter = useRef(100)

  const [schema, setSchema] = useState({})

  const defaultValues = useMemo(
    () => {
      try {
        return JSON.parse(JSON.stringify(initialValues))
      } catch (e) {
        console.warn('Cannot convert defaultValues into json', e)
        return {}
      }
    },
    [initialValues]
  )

  const needSchema = useMemo(
    () => !!schemaConstructor,
    [schemaConstructor]
  )

  // intercepting unform setFieldValue
  const setFieldValue = useCallback(
    (fieldName, value, ...other) => {
      const doSetFieldValue = (val) => {
        const fieldRef = formRef.current.getFieldRef(fieldName)
        let changed = false

        if (fieldRef?.setValue && !isEqual(fieldRef?.value, val)) {
          fieldRef.setValue(val)
          changed = true
        }
        // force unform field update
        const unformRefValue = unformRef.current.getFieldValue(fieldName)
        if (!isEqual(val, unformRefValue)) {
          unformRef.current.setFieldValue(fieldName, val)
        }
        if (changed && fieldRef.externalOnChange) {
          fieldRef.externalOnChange({ target: { value: val } }, ...other)
        }
        if (changed && fieldRef?.touched && fieldRef?.validateField()) {
          fieldRef.validateField()
        }
      }

      const makeSetFieldValue = () => {
        if (isFunction(value)) {
          const data = formRef.current.getFieldValue(fieldName)
          doSetFieldValue(value(data))
        } else {
          doSetFieldValue(value)
        }
      }

      if (formRef?.current) {
        makeSetFieldValue()
      } else {
        setTimeout(makeSetFieldValue, 100)
      }
    },
    [formRef]
  )

  // intercepting and changing unform clearField
  const clearField = useCallback(
    (fieldName) => {
      const fieldRef = formRef.current.getFieldRef(fieldName)
      if (
        fieldRef &&
        fieldRef.setValue &&
        !isEqual(fieldRef.value, fieldRef.defaultValue)
      ) {
        fieldRef.setValue(fieldRef.defaultValue)
      }
      // force unform field update
      const unformRefValue = unformRef.current.getFieldValue(fieldName)
      if (!isEqual(fieldRef.defaultValue, unformRefValue)) {
        unformRef.current.setFieldValue(fieldName, fieldRef.defaultValue)
      }
    },
    [formRef]
  )

  // intercepting and changing unform reset
  const reset = useCallback(
    () => {
      forEach(fields.current, (fieldName) => {
        const fieldRef = formRef.current.getFieldRef(fieldName)
        if (fieldRef.resetField) {
          fieldRef.resetField()
        }
      })
    },
    [formRef]
  )

  const getFieldOrder = useCallback(
    () => {
      fieldsOrderCounter.current += 1
      const order = fieldsOrderCounter.current
      return order
    },
    []
  )

  const getFieldZIndex = useCallback(
    () => {
      const zIndex = fieldsZIndexCounter.current
      fieldsZIndexCounter.current -= 1
      return zIndex
    },
    []
  )

  const getFieldError = useCallback(
    (fieldName) => unformRef.current.getFieldError(fieldName),
    []
  )

  const getErrors = useCallback(
    () => unformRef.current.getErrors(),
    []
  )

  const setFieldError = useCallback(
    debounce(
      (fieldName, error) => {
        const oldError = formRef.current.getFieldError(fieldName)
        if (!isEqual(error, oldError)) {
          unformRef.current.setFieldError(fieldName, error)
        }
      },
      100
    ),
    [formRef]
  )

  const setErrors = useCallback(
    (errors, parse) => {
      unformRef.current.setErrors(errors, parse)
    },
    []
  )

  const normalizeFormErrors = useCallback(
    (errors) => {
      let objErrors = {}
      forEach(errors, (message, name) => {
        const fieldRef = formRef.current.getFieldRef(name)
        if (fieldRef) {
          objErrors = {
            ...objErrors,
            [name]: message
          }
        } else {
          set(objErrors, name, message)
        }
      })
      return objErrors
    },
    [formRef]
  )

  const handleSubmit = useCallback(
    async (data) => {
      try {
        if (!isEmpty(schema)) {
          await validateDataBySchema({ data, schema })
        }

        const values = (() => {
          const submittedValues = {
            ...defaultValues,
            ...data
          }
          if (filterEmptyValues) {
            return removeEmptyValues(submittedValues)
          }
          return submittedValues
        })()

        onSubmit(values)
        if (resetOnSubmit) {
          reset()
        }
      } catch (err) {
        console.error('submit form error:', err, data)
        if (err.formError) {
          const objErrors = normalizeFormErrors(err.messages)
          formRef.current.setErrors(objErrors, false)
          onInvalidForm(objErrors)
        } else {
          onInvalidForm(err)
        }
      }
    },
    [defaultValues, filterEmptyValues, formRef, normalizeFormErrors, onInvalidForm, onSubmit, reset, resetOnSubmit, schema]
  )

  const getData = useCallback(
    () => {
      const data = { ...defaultValues }
      forEach(fields.current, (fieldName) => {
        set(data, fieldName, formRef.current.getFieldValue(fieldName))
      })
      if (filterEmptyValues) {
        return removeEmptyValues(data)
      }
      return data
    },
    [defaultValues, filterEmptyValues, formRef]
  )

  // intercepting and changing unform setData
  const setData = useCallback(
    (values) => {
      const doSetData = (vals) => {
        forEach(fields.current, (fieldName) => {
          const newFieldValue = get(vals, fieldName)
          if (newFieldValue !== undefined && newFieldValue !== null) {
            const fieldRef = formRef.current.getFieldRef(fieldName)
            if (fieldRef.setValue) {
              fieldRef.setValue(newFieldValue)
            }
          }
        })
        if (formRef.current?.setErrors) {
          formRef.current.setErrors({})
        }
      }

      setTimeout(() => {
        if (isFunction(values)) {
          const data = formRef.current.getData()
          doSetData(values(data))
        } else {
          doSetData(values)
        }
      }, 100)
    },
    [formRef]
  )

  const setFieldTouched = useCallback(
    (fieldName) => new Promise((resolve) => {
      const fieldRef = formRef.current.getFieldRef(fieldName)
      if (fieldRef.setTouched) {
        fieldRef.setTouched(true)
      }

      setTimeout(resolve, 400)
    }),
    [formRef]
  )

  const submit = useCallback(
    () => {
      const data = formRef.current.getData()
      handleSubmit(data)
    },
    [formRef, handleSubmit]
  )

  const registerFieldName = useCallback(
    (fieldName) => {
      fields.current.push(fieldName)
    },
    []
  )

  const unregisterFieldName = useCallback(
    (fieldName) => {
      fields.current = fields.current.filter((field) => field !== fieldName)
    },
    []
  )

  const createSchema = useCallback(
    () => {
      if (schemaConstructor && formRef?.current?.getData) {
        const data = formRef.current.getData()
        const newSchema = schemaConstructor({
          t, data, props: schemaProps
        })
        setSchema(newSchema)
        return newSchema
      }
      return {}
    },
    [formRef, schemaConstructor, schemaProps, t]
  )

  const validateField = useCallback(
    (fieldName) => {
      const fieldRef = formRef.current.getFieldRef(fieldName)
      if (fieldRef.validateField) {
        return fieldRef.validateField()
      }
    },
    [formRef]
  )

  const reloadSchema = useCallback(
    ({ reset = false, callback } = {}) => setTimeout(
      () => {
        if (reset) {
          formRef.current.setErrors({})
        }
        reloadSchemaUtils(formRef, callback)
      },
      100
    ),
    [formRef]
  )

  const setSubmitError = useCallback(
    debounce(
      (submitError = {}) => {
        if (submitError.response.data.errorCode === VALIDATION_FAILED) {
          // it is a form error from backend response
          let objErrors = reduce(
            submitError.response.data.details,
            (acc, error) => ({
              ...acc,
              [error.field]: first(error.messages)
            }),
            {}
          )
          objErrors = normalizeFormErrors(objErrors)
          formRef.current.setErrors(objErrors, false)
          onInvalidForm(objErrors)
        }
      },
      200
    ),
    [formRef, normalizeFormErrors]
  )

  const imperativeHandles = useMemo(
    () => ({
      createSchema,
      reloadSchema,
      setFieldValue,
      submit,
      registerFieldName,
      unregisterFieldName,
      getData,
      setData,
      clearField,
      reset,
      validateField,
      setFieldTouched,
      setFieldError,
      getFieldError,
      setErrors,
      getErrors,
      setSubmitError
    }),
    [clearField, createSchema, getData, getErrors, getFieldError, registerFieldName, reloadSchema, reset, setData, setErrors, setFieldError, setFieldTouched, setFieldValue, setSubmitError, submit, unregisterFieldName, validateField]
  )

  useEffect(() => {
    createSchema()
  }, [createSchema])

  useImperativeHandle(formRef, () => ({
    ...unformRef.current,
    ...imperativeHandles
  }))

  const state = useMemo(
    () => ({
      formRef,
      schema,
      needSchema,
      registerFieldName,
      unregisterFieldName,
      getFieldZIndex,
      getFieldOrder,
      defaultValues
    }),
    [defaultValues, formRef, getFieldOrder, getFieldZIndex, needSchema, registerFieldName, schema, unregisterFieldName]
  )

  return (
    <UnformComponent
      ref={ unformRef }
      onSubmit={ handleSubmit }
      { ...otherProps }
    >
      <FormContext.Provider value={ state }>
        {(!isEmpty(schema) || !schemaConstructor) && children}
      </FormContext.Provider>
    </UnformComponent>
  )
})

FormProvider.propTypes = {
  /** function that return the schema to control the form validations */
  schemaConstructor: PropTypes.func,
  /** bind dynamically options to schema constructor */
  schemaProps: PropTypes.object,
  /** function called when form pass the validations and it is submitted */
  onSubmit: PropTypes.func.isRequired,
  /** specific Form component from @unform/mobile or @unform/web */
  UnformComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]).isRequired,
  children: PropTypes.any,
  resetOnSubmit: PropTypes.bool,
  defaultValues: PropTypes.object,
  filterEmptyValues: PropTypes.bool,
  onInvalidForm: PropTypes.func
}

FormProvider.defaultProps = {
  children: null,
  schemaConstructor: undefined,
  schemaProps: {},
  resetOnSubmit: false,
  defaultValues: {},
  filterEmptyValues: false,
  onInvalidForm () {}
}
export default FormProvider
