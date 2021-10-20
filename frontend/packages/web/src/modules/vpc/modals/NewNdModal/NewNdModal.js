import React, {
  useCallback,
  useRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import ndSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/vpc/vpc.nd.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { establishments as establishmentsRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputDate from '@britania-crm/web-components/InputDate'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputMoney from '@britania-crm/web-components/InputMoney'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputSelect from '@britania-crm/web-components/InputSelect'
import Modal from '@britania-crm/web-components/Modal'
import TextArea from '@britania-crm/web-components/TextArea'

import useStyles from '../styles'

const NewNdModal = (props) => {
  const {
    id,
    open,
    handleClose,
    onSubmit
  } = props

  const t = useT()
  const formRef = useRef(null)
  const classes = useStyles()

  const companyOptions = useMemo(
    () => [
      { id: 'BRIT ELETRO', name: 'BRIT ELETRO' },
      { id: 'PHILCO', name: 'PHILCO' }
    ],
    []
  )

  const establishmentsParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10
    }),
    [])

  const handleChangeIssuerCompany = useCallback(
    (value) => {
      formRef.current.setFieldValue('issuerCompanyCode', value.establishmentCode)
      formRef.current.setFieldValue('issuerCompanyName', value.establishmentDescription)
    },
    []
  )

  const handleSubmit = useCallback(
    (values) => {
      onSubmit(values)
      handleClose()
    },
    [handleClose, onSubmit]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      maxWidth="md"
      title={ t('nd number') }
      variant="space"
      fullWidth
      FooterComponent={ () => (
        <Grid item xs={ 12 } className={ classes.buttons }>
          <Grid>
            <I18n as={ Button }
              onClick={ () => formRef.current.reset() }
              variant="text"
              color="secondary"
              type="reset"
              className={ classes.resetBtn }
            >
            clean
            </I18n>
          </Grid>
          <Grid>
            <I18n as={ Button }
              onClick={ handleClose }
              color="secondary"
              variant="outlined"
              className={ classes.btnCancel }
            >
            cancel
            </I18n>
            <I18n as={ Button }
              onClick={ () => formRef.current.submit() }
              color="secondary"
              className={ classes.btnSave }
            >
            save
            </I18n>
          </Grid>
        </Grid>
      ) }
    >
      <Form
        ref={ formRef }
        schemaConstructor={ ndSchema }
        defaultValues={ INITIAL_VALUES }
        onSubmit={ handleSubmit }
      >
        <Grid container spacing={ 1 }>
          <Grid item xs={ 12 } md={ 3 }>
            <InputNumber
              label={ t('nd number') }
              name="number"
            />
          </Grid>
          <Grid item xs={ 12 } md={ 6 }>
            <InputAutocomplete
              url={ establishmentsRoutes.getAll }
              valueKey="establishmentDescription"
              paramName="description"
              params={ establishmentsParams }
              label={ t('issuing company nd') }
              name="issuerCompany"
              onValueChange={ handleChangeIssuerCompany }
            />
            <InputHidden name="issuerCompanyName" />
            <InputHidden name="issuerCompanyCode" />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputDate
              label={ `${ t('issue date') } ${ t('nd') }` }
              name="issueDate"
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputDate
              label={ `${ t('due date') } ${ t('nd') }` }
              name="dueDate"
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputMoney
              label={ t('value') }
              name="value"
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputSelect
              label={ t('company') }
              name="company"
              options={ companyOptions }
            />
          </Grid>
          <Grid item xs={ 12 }>
            <TextArea
              label={ t('observation', { howMany: 1 }) }
              name="observation"
              rows={ 2 }
            />
          </Grid>
        </Grid>
      </Form>
    </Modal>
  )
}

NewNdModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default NewNdModal
