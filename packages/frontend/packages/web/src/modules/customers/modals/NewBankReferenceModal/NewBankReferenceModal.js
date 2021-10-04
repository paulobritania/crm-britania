import React, {
  useCallback,
  useRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import { useFormEffect } from '@britania-crm/forms'
import bankReferenceSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.bankReference.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { bank as bankCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import { trimMask } from '@britania-crm/utils/formatters'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputPhone from '@britania-crm/web-components/InputPhone'
import Modal from '@britania-crm/web-components/Modal'

const NewBankReferenceModal = (props) => {
  const {
    id,
    open,
    handleClose,
    onSubmit,
    bankReference
  } = props

  const t = useT()
  const formRef = useRef(null)

  const banckParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10
    }),
    [])

  const handleChangeBank = useCallback(
    (value) =>
      formRef.current.setFieldValue('name', value.description)
    , [])

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
      if (!isEmpty(bankReference)) {
        formRef.current.setData({
          ...bankReference,
          code: {
            description: bankReference?.name,
            label: bankReference?.name
          }
        })
      }
    },
    [bankReference]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      maxWidth="md"
      title={ t('bank reference', { howMany: 1 }) }
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
        schemaConstructor={ bankReferenceSchema }
        defaultValues={ INITIAL_VALUES }
        onSubmit={ handleSubmit }
      >
        <Grid container spacing={ 1 }>
          <Grid item sm={ 12 } md={ 4 }>
            <InputAutocomplete
              name="code"
              label={ t('bank') }
              url={ bankCrmRoutes.getAll }
              params={ banckParams }
              normalizeDataFn={ (options) => map(options, ({ code, description }) => ({
                code, description, label: `${ code } - ${ description }`
              })) }
              valueKey="label"
              paramName="description"
              onValueChange={ handleChangeBank }
            />
            <InputHidden name="name" />
          </Grid>
          <Grid item sm={ 12 } md={ 2 }>
            <InputNumber
              name="agency"
              label={ t('agency', { howMany: 1 }) }
            />
          </Grid>
          <Grid item sm={ 12 } md={ 3 }>
            <InputNumber
              name="account"
              label={ t('account', { howMany: 1 }) }
            />
          </Grid>
          <Grid item sm={ 12 } md={ 3 }>
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

NewBankReferenceModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  bankReference: PropTypes.object
}

NewBankReferenceModal.defaultProps = { bankReference: {} }

export default NewBankReferenceModal
