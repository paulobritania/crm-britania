import React, {
  useCallback,
  useRef,
  useMemo
} from 'react'

import moment from 'moment'
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import { useFormEffect } from '@britania-crm/forms'
import revenueSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.revenue.schema'
import I18n, { useT } from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputMoney from '@britania-crm/web-components/InputMoney'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputSelect from '@britania-crm/web-components/InputSelect'
import Modal from '@britania-crm/web-components/Modal'

const NewRevenueModal = (props) => {
  const {
    id,
    open,
    handleClose,
    onSubmit,
    revenue
  } = props

  const t = useT()
  const formRef = useRef(null)

  const monthOptions = useMemo(
    () => map(Array(12), (_, i) => ({
      id: i + 1,
      name: moment(i + 1, 'M').format('MMMM')
    })),
    []
  )

  const handleSubmit = useCallback(
    (values) => {
      onSubmit({
        ...values,
        year: Number(values.year),
        value: Number(values.value)
      })
      handleClose()
    },
    [handleClose, onSubmit]
  )

  useFormEffect(
    () => {
      if (!isEmpty(revenue)) {
        formRef.current.setData(revenue)
      }
    },
    [revenue]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      maxWidth="md"
      title={ t('revenue', { howMany: 1 }) }
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
        schemaConstructor={ revenueSchema }
        defaultValues={ INITIAL_VALUES }
        onSubmit={ handleSubmit }
      >
        <Grid container spacing={ 1 }>
          <Grid item xs={ 12 } md={ 3 }>
            <InputSelect
              name="month"
              label={ t('month') }
              options={ monthOptions }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 5 }>
            <InputNumber
              name="year"
              label={ t('year') }
              maxLength={ 4 }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 4 }>
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

NewRevenueModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  revenue: PropTypes.object
}

NewRevenueModal.defaultProps = { revenue: {} }

export default NewRevenueModal
