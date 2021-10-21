import React, {
  useCallback,
  useRef
} from 'react'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'

import { useFormEffect } from '@britania-crm/forms'
import counterPropertySchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.counterProperty.schema'
import I18n, { useT } from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputMoney from '@britania-crm/web-components/InputMoney'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'

const NewCounterPropertyModal = (props) => {
  const {
    id,
    open,
    handleClose,
    onSubmit,
    counterProperty
  } = props

  const t = useT()
  const formRef = useRef(null)

  const handleSubmit = useCallback(
    (values) => {
      onSubmit({
        ...values,
        value: Number(values.value)
      })
      handleClose()
    },
    [handleClose, onSubmit]
  )

  useFormEffect(
    () => {
      if (!isEmpty(counterProperty)) {
        formRef.current.setData(counterProperty)
      }
    },
    [counterProperty]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      maxWidth="md"
      title={ t('goods list') }
      variant="space"
      fullWidth
      FooterComponent={ () => (
        <>
          <I18n as={ Button }
            onClick={ handleClose }
            color="secondary"
            variant="outlined"
          >
            cancel
          </I18n>
          <I18n as={ Button }
            onClick={ () => formRef.current.submit() }
            color="secondary"
            style={ { marginLeft: 10 } }
          >
            save
          </I18n>
        </>
      ) }
    >
      <Form
        ref={ formRef }
        schemaConstructor={ counterPropertySchema }
        defaultValues={ INITIAL_VALUES }
        onSubmit={ handleSubmit }
      >
        <Grid container spacing={ 1 }>
          <Grid item xs={ 12 } md={ 5 }>
            <InputText
              name="description"
              label={ t('description') }
              maxLength={ 31 }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 4 }>
            <InputText
              name="localization"
              label={ t('material good relation localization') }
              maxLength={ 16 }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputMoney
              name="value"
              label={ t('value') }
            />
          </Grid>
        </Grid>
      </Form>
    </Modal>
  )
}

NewCounterPropertyModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  counterProperty: PropTypes.object
}

NewCounterPropertyModal.defaultProps = { counterProperty: {} }

export default NewCounterPropertyModal
