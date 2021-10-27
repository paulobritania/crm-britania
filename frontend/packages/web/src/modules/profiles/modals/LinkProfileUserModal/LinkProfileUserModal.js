import React, {
  useCallback,
  useState,
  useEffect,
  useMemo
} from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import I18n, { useT } from '@britania-crm/i18n'
import {
  users as usersCrmRoutes,
  profiles as profilesCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { ProfilesActions } from '@britania-crm/stores/profiles'
import Button from '@britania-crm/web-components/Button'
import Modal from '@britania-crm/web-components/Modal'
import TransferList from '@britania-crm/web-components/TransferList'

import {
  BindContainer,
  ButtonContainer
} from './styles'

const LinkProfileUserModal = (props) => {
  const {
    id,
    profileId,
    profileName,
    open,
    handleClose,
    enableLoading
  } = props

  const t = useT()
  const dispatch = useCallback(useDispatch(), [])

  const {
    data: usersFromApi,
    loading: usersLoading
  } = useCrmApi(usersCrmRoutes.list)

  const {
    data: profilesFromApi,
    loading: profilesLoading,
    mutate: profilesMutate
  } = useCrmApi(profileId ? [`${ profilesCrmRoutes.list }/${ profileId }`, profileId] : null)

  const [loading, setLoading] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])

  useEffect(() => {
    if (!isEmpty(profilesFromApi)) { getProfileById() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilesFromApi])

  const users = useMemo(() => map(usersFromApi, (user) => ({ id: user.id, name: user.username })), [usersFromApi])

  const getProfileById = useCallback(() => {
    setLoading(true)
    const { userProfile } = profilesFromApi
    const users = map(userProfile, (user) => ({ id: user.userId }))
    setSelectedUsers(users)
    setLoading(false)
  }, [profilesFromApi])

  const handleConfirm = useCallback(
    () => {
      if (enableLoading) {
        setLoading(true)
      }
      const {
        name,
        active,
        permissions,
        accesses,
        micros,
        exceptions
      } = profilesFromApi

      const payload = {
        name,
        active,
        permissions: !isEmpty(permissions) ? permissions.map((item) => item.permissionId) : [],
        access: !isEmpty(accesses) ? accesses.map((item) => item.accessId) : [],
        micros: !isEmpty(micros) ? micros.map((item) => item.fieldId) : [],
        users: !isEmpty(selectedUsers) ? selectedUsers.map((item) => item.id) : [],
        exceptions: !isEmpty(exceptions) ? exceptions.map((item) => ({
          access: item.accessId,
          permission: item.permissionId
        })) : []
      }

      dispatch(ProfilesActions.editProfile(profileId, payload, () => {
        profilesMutate()
        setLoading(false)
        handleClose()
      }))
    },
    [dispatch, enableLoading, handleClose, profileId, profilesFromApi, profilesMutate, selectedUsers]
  )

  return (
    <Modal
      id={ id }
      title={ t('link of {this}', { this: t('user', { howMany: 2 }) }) }
      open={ open }
      maxWidth="md"
      loading={ loading || usersLoading || profilesLoading }
      fullWidth
      FooterComponent={ () => (
        <ButtonContainer>
          <Button
            color="secondary"
            variant="outlined"
            onClick={ handleClose }
            disabled={ loading || usersLoading || profilesLoading }
          >
            <I18n>cancel</I18n>
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={ handleConfirm }
            disabled={ loading || usersLoading || profilesLoading }
          >
            <I18n>save</I18n>
          </Button>
        </ButtonContainer>
      ) }
    >
      <BindContainer>
        <TransferList
          detached
          title={ t('user', { howMany: 2 }) }
          options={ users }
          value={ selectedUsers }
          onChange={ setSelectedUsers }
          loading={ usersLoading || profilesLoading }
          header={ profileName }
          type={ t('perfil') }
        />
      </BindContainer>
    </Modal>
  )
}

LinkProfileUserModal.propTypes = {
  id: PropTypes.string.isRequired,
  profileId: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  profileName: PropTypes.string,
  enableLoading: PropTypes.bool
}

LinkProfileUserModal.defaultProps = {
  profileName: '',
  enableLoading: false
}

export default LinkProfileUserModal
