import React, {
  useCallback,
  useRef,
  useState
} from 'react'

import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputAdornment from '@material-ui/core/InputAdornment'

import { useFormEffect } from '@britania-crm/forms'
import vpcProductSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/vpc/vpc.product.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { products as productsRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { useSnackbar } from '@britania-crm/snackbar'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'

import useStyles from '../styles'

const NewProductModal = (props) => {
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

  const [productCode, setProductCode] = useState(INITIAL_VALUES.productCode)

  const { data, loading } = useCrmApi(
    productCode
      ? [productsRoutes.getOne.replace(':productCode', productCode), productCode]
      : null, null,
    { onSuccess: (values) => formRef.current.setFieldValue('description', values?.description) }
  )

  const handleChangeProductCode = useCallback(
    debounce((value) => {
      if (value.length > 3) {
        setProductCode(value)
      }
    },
    1000),
    [])

  const handleSubmit = useCallback(
    (values) => {
      onSubmit(values)
      handleClose()
    },
    [handleClose, onSubmit]
  )

  useFormEffect(
    () => {
      if (isEmpty(data) && productCode) {
        snackbar.error(t('no product was found for the given number!'))
        formRef.current.setData((old) => ({
          ...INITIAL_VALUES,
          code: old.code
        }))
      }
    },
    [data, productCode, snackbar, t]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      title={ t('new product') }
      variant="space"
      maxWidth="md"
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
      <Form ref={ formRef }
        onSubmit={ handleSubmit }
        schemaConstructor={ vpcProductSchema }
        defaultValues={ INITIAL_VALUES }
      >
        <Grid container spacing={ 1 }>
          <Grid item xs={ 12 } md={ 3 }>
            <InputNumber
              label={ t('product code') }
              name="code"
              onValueChange={ handleChangeProductCode }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 6 }>
            <InputText
              label={ t('product name') }
              name="description"
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
          <Grid item xs={ 12 } md={ 3 }>
            <InputNumber
              label={ t('product quantity') }
              name="quantity"
            />
          </Grid>
        </Grid>
      </Form>
    </Modal>
  )
}

NewProductModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default NewProductModal
