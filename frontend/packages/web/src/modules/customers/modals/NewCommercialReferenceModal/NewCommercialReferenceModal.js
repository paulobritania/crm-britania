import React, {
  useCallback,
  useRef
} from 'react'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'

import { useFormEffect } from '@britania-crm/forms'
import commercialReferenceSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.commercialReference.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { trimMask } from '@britania-crm/utils/formatters'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputPhone from '@britania-crm/web-components/InputPhone'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'

const NewCommercialReferenceModal = (props) => {
  const {
    id,
    open,
    handleClose,
    onSubmit,
    commercialReference
  } = props

  const t = useT()
  const formRef = useRef(null)

  const handleSubmit = useCallback(
    (values) => {
      onSubmit({
        ...values,
        phone: trimMask(values.phone || '')
      })
      handleClose()
    },
    [handleClose, onSubmit]
  )

  useFormEffect(
    () => {
      if (!isEmpty(commercialReference)) {
        formRef.current.setData(commercialReference)
      }
    },
    [commercialReference]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      maxWidth="md"
      title={ t('commercial reference', { howMany: 1 }) }
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
        schemaConstructor={ commercialReferenceSchema }
        defaultValues={ INITIAL_VALUES }
        onSubmit={ handleSubmit }
      >
        <Grid container spacing={ 1 }>
          <Grid item xs={ 12 } md={ 5 }>
            <InputText
              name="name"
              label={ t('name', { howMany: 1 }) }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 4 }>
            <InputPhone
              name="phone"
              label={ t('phone', { howMany: 1 }) }
            />
          </Grid>
        </Grid>
      </Form>
    </Modal>
  )
}

NewCommercialReferenceModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  commercialReference: PropTypes.object
}

NewCommercialReferenceModal.defaultProps = { commercialReference: {} }

export default NewCommercialReferenceModal
