import React, { useCallback } from 'react'

import PropTypes from 'prop-types'

import { MSG006 } from '@britania-crm/constants/feedbackMessages.constants'
import I18n from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'
import Modal from '@britania-crm/web-components/Modal'

import useStyles, {
  Row,
  Content,
  TextWarning
} from './styles'

const ConfirmModal = ({
  id,
  open,
  handleClose,
  onConfirm,
  onNegative,
  textButtonOnConfirm,
  textButtonOnNegative,
  text
}) => {
  const classes = useStyles()

  const closeModal = useCallback(
    () => {
      onNegative()
      handleClose()
    },
    [handleClose, onNegative]
  )

  const submitModal = useCallback(
    () => {
      onConfirm()
      handleClose()
    },
    [handleClose, onConfirm]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      title={
        <Row>
          <I18n>warning</I18n>
        </Row>
      }
      disableFullScreen
      contentContainerStyle={ { padding: 24 } }
      headerProps={ { titleClass: classes.title } }
      FooterComponent={ () => (
        <>
          <Button
            onClick={ closeModal }
            variant="outlined"
            color="secondary"
          >
            {textButtonOnNegative ? <p>{textButtonOnNegative}</p> : <I18n>no</I18n>}
          </Button>
          <Button
            onClick={ submitModal }
            color="secondary"
            style={ { marginLeft: 8 } }
          >
            {textButtonOnConfirm ? <p>{textButtonOnConfirm}</p> : <I18n>yes</I18n>}
          </Button>
        </>
      ) }
    >
      <>
        <Content>
          <TextWarning>{text}</TextWarning>
        </Content>
      </>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  onNegative: PropTypes.func,
  text: PropTypes.string,
  textButtonOnConfirm: PropTypes.string,
  textButtonOnNegative: PropTypes.string
}

ConfirmModal.defaultProps = {
  textButtonOnConfirm: '',
  textButtonOnNegative: '',
  onNegative () {},
  onConfirm () {},
  text: MSG006
}

export default ConfirmModal
