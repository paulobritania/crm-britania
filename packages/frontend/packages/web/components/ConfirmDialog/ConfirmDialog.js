import React from 'react'

import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

import I18n from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'

const ConfirmDialog = ({
  handleConfirm,
  handleNotConfirm,
  open,
  title
}) => (
  <Dialog
    disableBackdropClick
    open={ open }
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <I18n as={ DialogTitle } id="alert-dialog-title">
      {title}
    </I18n>
    <DialogActions>
      <Button onClick={ handleConfirm } color="secondary" variant="text">
        Sim
      </Button>
      <Button onClick={ handleNotConfirm } color="secondary" variant="text">
        Não
      </Button>
    </DialogActions>
  </Dialog>
)

ConfirmDialog.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  handleNotConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}

export default ConfirmDialog
