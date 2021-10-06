import React from 'react'

import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { useStyles } from './styles'

const AlertDialog = ({
  description,
  children,
  title,
  open,
  onClose,
  ...rest
}) => {
  const handleClose = onClose || (() => null)
  const classes = useStyles()

  return (
    <Dialog
      open={ open }
      onClose={ handleClose }
      className={ classes.root }
      classes={ { paper: classes.paper } }
      { ...rest }
    >
      {title && (
        <DialogTitle disableTypography className={ classes.dialogTitle }>
          <h2>{title}</h2>
          <IconButton size="small" onClick={ handleClose } className={ classes.closeButton }>
            <CloseIcon size="small" />
          </IconButton>
        </DialogTitle>
      )}

      {children
        ? (
          <>
            {!title && (
              <IconButton size="small" onClick={ handleClose } className={ classes.closeButton }>
                <CloseIcon size="small" />
              </IconButton>
            )}
            {children}
          </>
        )
        : (
          <>
            <DialogContent className={ classes.dialogContent }>
              <DialogContentText>
                {description}
              </DialogContentText>
            </DialogContent>
            <DialogActions style={ { justifyContent: 'center' } }>
              <Button onClick={ handleClose } variant="outlined" color="secondary" id="no" className={ classes.circleButtonRight }>
                Não
              </Button>
              <Button onClick={ handleClose } href="/cadastros/cliente" color="secondary" id="yes" className={ classes.circleButtonLeft }>
                Sim
              </Button>
            </DialogActions>
          </>
        )}
    </Dialog>
  )
}

AlertDialog.propTypes = {
  children: PropTypes.func,
  description: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.func
}

AlertDialog.defaultProps = {
  children: null,
  description: '',
  title: ''
}

export default AlertDialog
