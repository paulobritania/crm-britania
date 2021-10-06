import React, {
  useRef,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'

import { useFormEffect } from '@britania-crm/forms'
import negotiatedFundsSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/fan/negotiatedFunds.schema'
import I18n, { useT } from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'

import useStyles from '../styles'

const FundTratedModal = ({
  id,
  open,
  handleClose,
  onSubmit,
  slaghterReturnOptions,
  rangeOptions,
  calculationOptions,
  basisOfCalculationOptions,
  descontOptions,
  row
}) => {
  const t = useT()
  const formRef = useRef(null)
  const classes = useStyles()

  const handleSubmit = useCallback(
    (values) => {
      onSubmit({ ...values, value: Number(values.value) })
      handleClose()
    },
    [handleClose, onSubmit]
  )

  useFormEffect(
    () => {
      if (!isEmpty(row)) {
        formRef.current.setData({ ...row })
      }
    },
    [row])

  return (
    <Modal
      id={ id }
      open={ open }
      title={ t('other negotiated funds') }
      maxWidth="md"
      fullWidth
      escapeWhenLoading
      FooterComponent={ () => (
        <Grid item xs={ 12 } className={ classes.buttons }>
          <Grid>
            <I18n
              as={ Button }
              className={ classes.resetBtn }
              disabled={ false }
              variant="text"
              color="secondary"
              type="reset"
              onClick={ () => formRef.current.reset() }
            >
                clean
            </I18n>
          </Grid>
          <Grid>
            <I18n
              as={ Button }
              variant="outlined"
              color="secondary"
              disabled= { false }
              onClick={ handleClose }
            >
              cancel
            </I18n>
            <I18n as={ Button }
              color="secondary"
              variant="contained"
              className={ classes.btnSave }
              isLoading={ false }
              onClick={ () => formRef.current.submit() }
            >
              finish registration
            </I18n>
          </Grid>
        </Grid>
      ) }
    >
      <Form
        ref={ formRef }
        onSubmit={ handleSubmit }
        schemaConstructor={ negotiatedFundsSchema }
        defaultValues={ INITIAL_VALUES }
      >
        <Grid container item sm={ 12 } spacing={ 1 } >
          <Grid item sm={ 12 } md={ 4 }>
            <InputNumber
              label={ t('value') }
              name="value"
            />
          </Grid>
          <Grid item sm={ 12 } md={ 4 }>
            <InputText
              label={ t('description') }
              name="description"
            />
          </Grid>
          <Grid item sm={ 12 } md={ 4 }>
            <InputSelect
              label={ t('frequency', { howMany: 1 }) }
              name="periodicity"
              idKey="id"
              valueKey="name"
              options={ rangeOptions }
            />
          </Grid>
          <Grid item sm={ 12 } md={ 3 }>
            <InputSelect
              label={ t('discount') }
              name="discount"
              idKey="id"
              valueKey="name"
              options={ descontOptions }
            />
          </Grid>
          <Grid item sm={ 12 } md={ 3 }>
            <InputSelect
              label={ t('basis of calculation') }
              name="basisOfCalculation"
              idKey="id"
              valueKey="name"
              options={ basisOfCalculationOptions }
            />
          </Grid>
          <Grid item sm={ 12 } md={ 3 }>
            <InputSelect
              label={ t('calculation basis') }
              name="determinationBasis"
              idKey="id"
              valueKey="name"
              options={ calculationOptions }
            />
          </Grid>
          <Grid item sm={ 12 } md={ 3 }>
            <InputSelect
              label={ t('slaughter return') }
              name="slaughterReturn"
              idKey="id"
              valueKey="name"
              options={ slaghterReturnOptions }
            />
          </Grid>
        </Grid>
      </Form>
    </Modal>
  )
}

FundTratedModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  slaghterReturnOptions: PropTypes.array.isRequired,
  rangeOptions: PropTypes.array.isRequired,
  calculationOptions: PropTypes.array.isRequired,
  basisOfCalculationOptions: PropTypes.array.isRequired,
  descontOptions: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
  row: PropTypes.object
}

FundTratedModal.defaultProps = { onSubmit () {}, row: {} }

export default FundTratedModal
