import React, {
  useCallback,
  useRef
} from 'react'

import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'

import cancelNdSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/vpc/vpc.nd.cancel.schema'
import I18n, { useT } from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import Modal from '@britania-crm/web-components/Modal'
import TextArea from '@britania-crm/web-components/TextArea'

import useStyles from '../styles'

const NewNdModal = (props) => {
  const {
    id,
    open,
    handleClose,
    onConfirm
  } = props

  const t = useT()
  const formRef = useRef(null)
  const classes = useStyles()

  const handleSubmit = useCallback(
    (values) => {
      onConfirm(values)
      handleClose()
    },
    [handleClose, onConfirm]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      title={ t('justify nd cancellation') }
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
        schemaConstructor={ cancelNdSchema }
        defaultValues={ INITIAL_VALUES }
        onSubmit={ handleSubmit }
      >
        <Grid container spacing={ 1 }>
          <Grid item xs={ 12 }>
            <TextArea
              label={ t('reason') }
              name="reasonDeactivation"
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
  onConfirm: PropTypes.func.isRequired
}

export default NewNdModal
