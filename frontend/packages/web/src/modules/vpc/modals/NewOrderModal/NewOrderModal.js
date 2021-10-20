import React, {
  useCallback,
  useRef,
  useState,
  useEffect
} from 'react'

import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'

import { useFormEffect } from '@britania-crm/forms'
import vpcOrderSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/vpc/vpc.order.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { vpc as vpcRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { useSnackbar } from '@britania-crm/snackbar'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputMoney from '@britania-crm/web-components/InputMoney'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'

import useStyles from '../styles'

const NewOrderModal = (props) => {
  const {
    id,
    open,
    handleClose,
    onSubmit
  } = props

  const t = useT()
  const formRef = useRef(null)
  const classes = useStyles()
  const snackbar = useSnackbar()

  const [requestNumber, setRequestNumber] = useState(INITIAL_VALUES.requestNumber)

  const { data, loading } = useCrmApi(
    requestNumber
      ? [vpcRoutes.getRequestByNumber.replace(':requestNumber', requestNumber), requestNumber]
      : null
  )

  const handleChangeRequestNumber = useCallback(debounce(setRequestNumber, 1000), [])

  const handleSubmit = useCallback(
    (values) => {
      onSubmit(values)
      handleClose()
    },
    [handleClose, onSubmit]
  )

  useFormEffect(
    () => {
      if (!isEmpty(data) && data?.code) {
        formRef.current.setData({
          requestNumber,
          establishmentCode: data?.code,
          establishmentName: data?.name,
          value: data?.value
        })
      }
    },
    [data, requestNumber]
  )

  useEffect(() => {
    if (!isEmpty(data) && !data?.code) {
      snackbar.error(t('no request was found for the given number!'))
      formRef.current.setData((old) => ({
        ...INITIAL_VALUES,
        requestNumber: old.requestNumber
      }))
    }
  }, [data, requestNumber, snackbar, t])

  return (
    <Modal
      id={ id }
      open={ open }
      title={ t('new order') }
      variant="space"
      maxWidth="lg"
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
        onSubmit={ handleSubmit }
        schemaConstructor={ vpcOrderSchema }
        defaultValues={ INITIAL_VALUES }
      >
        <Grid container spacing={ 1 }>
          <Grid item xs={ 12 } md={ 3 }>
            <InputNumber
              label={ t('order number') }
              name="requestNumber"
              onValueChange={ handleChangeRequestNumber }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputText
              label={ t('establishment code') }
              name="establishmentCode"
              disabled
              InputProps={ {
                endAdornment: (
                  <InputAdornment position="end">
                    {loading && (
                      <CircularProgress
                        color="inherit"
                        size={ 18 }
                      />
                    ) }
                  </InputAdornment>
                )
              } }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 4 }>
            <InputText
              label={ t('name of the establishment') }
              name="establishmentName"
              disabled
              InputProps={ {
                endAdornment: (
                  <InputAdornment position="end">
                    {loading && (
                      <CircularProgress
                        color="inherit"
                        size={ 18 }
                      />
                    ) }
                  </InputAdornment>
                )
              } }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 2 }>
            <InputMoney
              label={ t('value') }
              name="value"
              disabled
              InputProps={ {
                endAdornment: (
                  <InputAdornment position="end">
                    {loading && (
                      <CircularProgress
                        color="inherit"
                        size={ 18 }
                      />
                    ) }
                  </InputAdornment>
                )
              } }
            />
          </Grid>
        </Grid>
      </Form>
    </Modal>
  )
}

NewOrderModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default NewOrderModal
