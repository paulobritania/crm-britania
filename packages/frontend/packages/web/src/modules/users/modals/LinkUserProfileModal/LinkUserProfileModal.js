import React, {
  useCallback,
  useState
} from 'react'

import PropTypes from 'prop-types'

import I18n, { useT } from '@britania-crm/i18n'
import * as crmApiRoutes from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import Button from '@britania-crm/web-components/Button'
import Modal from '@britania-crm/web-components/Modal'
import TransferList from '@britania-crm/web-components/TransferList'

import {
  BindContainer,
  ButtonContainer
} from '../styles'

const LinkUserProfileModal = (props) => {
  const {
    id,
    open,
    handleClose,
    onSave,
    initialProfiles,
    username,
    enableLoading
  } = props

  const t = useT()
  const { data: profiles, loading: loadingProfiles } = useCrmApi(crmApiRoutes.profiles.list)

  const [loading, setLoading] = useState(false)
  const [selectedProfiles, setSelectedProfiles] = useState(initialProfiles)

  const handleConfirm = useCallback(
    () => {
      if (enableLoading) setLoading(true)
      onSave(
        selectedProfiles,
        handleClose,
        () => enableLoading && setLoading(false)
      )
    },
    [enableLoading, handleClose, onSave, selectedProfiles]
  )

  return (
    <Modal
      id={ id }
      title={ t('link profile', { howMany: 1 }) }
      open={ open }
      maxWidth="md"
      loading={ loading }
      fullWidth
      FooterComponent={ () => (
        <ButtonContainer>
          <Button
            color="secondary"
            variant="outlined"
            onClick={ handleClose }
            disabled={ loading }
          >
            <I18n>cancel</I18n>
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={ handleConfirm }
            disabled={ loading }
          >
            <I18n>save</I18n>
          </Button>
        </ButtonContainer>
      ) }
    >
      <BindContainer>
        <TransferList
          detached
          title={ t('profile', { howMany: 2 }) }
          options={ profiles }
          value={ selectedProfiles }
          onChange={ setSelectedProfiles }
          loading={ loadingProfiles }
          header={ username }
          type={ t('user', { howMany: 1 }) }
        />
      </BindContainer>
    </Modal>
  )
}

LinkUserProfileModal.propTypes = {
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  initialProfiles: PropTypes.array,
  username: PropTypes.string,
  enableLoading: PropTypes.bool
}

LinkUserProfileModal.defaultProps = {
  initialProfiles: [],
  username: '',
  enableLoading: false
}

export default LinkUserProfileModal
