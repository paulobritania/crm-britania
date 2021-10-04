import React, {
  useCallback,
  useMemo,
  forwardRef
} from 'react'

import PropTypes from 'prop-types'

import map from 'lodash/map'
import reduce from 'lodash/reduce'

import dynamicSchema from '@britania-crm/forms/schemas/dynamic/dynamic.schema'
import { useT } from '@britania-crm/i18n'

import Button from '../Button'
import DynamicInput from '../DynamicInput'
import Form from '../Form'

const DynamicForm = forwardRef((props, formRef) => {
  const {
    schema,
    hideSubmit,
    submitTitle,
    ...rest
  } = props

  const t = useT()

  const defaultValues = useMemo(
    () => reduce(
      schema,
      (acc, field) => ({
        ...acc,
        [field.name]: field.defaultValue !== undefined ? field.defaultValue : ''
      }),
      {}
    ),
    [schema]
  )

  const schemaConstructor = useCallback(
    ({ t }) => dynamicSchema(schema, { t }),
    [schema]
  )

  return (
    <Form
      ref={ formRef }
      schemaConstructor={ schemaConstructor }
      defaultValues={ defaultValues }
      { ...rest }
    >
      {map(schema, (field) => (
        <DynamicInput key={ field.name } { ...field } />
      ))}

      {!hideSubmit && (
        <Button
          color="primary"
          onClick={ () => formRef.current.submit() }
        >
          {submitTitle || t('save')}
        </Button>
      )}
    </Form>
  )
})

DynamicForm.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.shape({
    input: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  onSubmit: PropTypes.func,
  hideSubmit: PropTypes.bool,
  submitTitle: PropTypes.string
}

DynamicForm.defaultProps = {
  schema: [],
  onSubmit () {},
  hideSubmit: false,
  submitTitle: ''
}

export default DynamicForm
