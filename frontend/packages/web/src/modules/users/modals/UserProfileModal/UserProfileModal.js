import React, {
  useCallback,
  useMemo
} from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import { useDialog } from '@britania-crm/dialog'
import I18n, { useT } from '@britania-crm/i18n'
import { users } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { UsersActions } from '@britania-crm/stores/users'
import colors from '@britania-crm/styles/colors'
import { formatBackDateTimeToBackDateFormat } from '@britania-crm/utils/date'
import { formatPathToCloudStorageUrl } from '@britania-crm/utils/files'
import AssociatedDataList from '@britania-crm/web-components/AssociatedDataList'
import Button from '@britania-crm/web-components/Button'
import Checkbox from '@britania-crm/web-components/Checkbox'
import DeleteIcon from '@britania-crm/web-components/Icons/DeleteIcon'
import EditIcon from '@britania-crm/web-components/Icons/EditIcon'
import LinkIcon from '@britania-crm/web-components/Icons/LinkIcon'
import Image from '@britania-crm/web-components/Image'
import InputDateRange from '@britania-crm/web-components/InputDateRange'
import InputPhone from '@britania-crm/web-components/InputPhone'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'

import LinkUserProfileModal from '../LinkUserProfileModal'
import NewUserModal from '../NewUserModal'
import useStyles, {
  Grid,
  Container,
  ActionsAndImage
} from '../styles'

const UserProfileModal = (props) => {
  const {
    id,
    open,
    handleClose,
    user: externalUser,
    onSuccess: refreshTable,
    currentRoutePermissions
  } = props

  const classes = useStyles()
  const dispatch = useCallback(useDispatch(), [])
  const { createDialog } = useDialog()
  const t = useT()

  const userId = useMemo(() => externalUser?.id, [externalUser])

  const {
    data: userFromApi = {},
    loading,
    mutate
  } = useCrmApi([`${ users.get }/${ userId }`])

  const user = useMemo(
    () => !isEmpty(userFromApi) ? userFromApi : externalUser,
    [externalUser, userFromApi]
  )

  const attachProfile = useCallback((id, params, onSuccess, onError) => {
    dispatch(UsersActions.attachProfiles(
      id,
      params,
      () => {
        onSuccess()
        mutate()
        refreshTable()
      },
      onError
    ))
  }, [dispatch, mutate, refreshTable])

  const onEditClick = useCallback(
    () => {
      handleClose()
      createDialog({
        id: 'edit-user-modal',
        Component: NewUserModal,
        props: { userId: user.id }
      })
    },
    [createDialog, handleClose, user]
  )

  const onBindClick = useCallback(
    () => {
      // handleClose()
      createDialog({
        id: 'bind-user-profile-modal',
        Component: LinkUserProfileModal,
        props: {
          username: user.username,
          initialProfiles: map(user.userProfiles, ({ profileId, ...profile }) => ({ id: profileId, ...profile })),
          enableLoading: true,
          onSave (profiles, onSuccess, onError) {
            const profilesId = map(profiles, (item) => item.id)
            attachProfile(user.id, profilesId, onSuccess, onError)
          }
        }
      })
    },
    [attachProfile, createDialog, user.id, user.userProfiles, user.username]
  )

  const onDeleteClick = useCallback(
    () => createDialog({
      id: 'delete-user-modal',
      Component: ConfirmModal,
      props: {
        onConfirm () {
          handleClose()
          console.log('delete user', user)
        }
      }
    }),
    [createDialog, handleClose, user]
  )

  const represetantiveName = useMemo(() => (
    map(userFromApi.representativeCodes, (item) => item.code).join(', ')
  ), [userFromApi])

  const substituteUserPeriod = useMemo(
    () => ({
      from: user.substituteUserStartDate ? formatBackDateTimeToBackDateFormat(user.substituteUserStartDate) : '',
      to: user.substituteUserEndDate ? formatBackDateTimeToBackDateFormat(user.substituteUserEndDate) : ''
    }),
    [user.substituteUserEndDate, user.substituteUserStartDate]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      title={ t('user profile') }
      maxWidth="lg"
      fullWidth
      loading={ loading }
      escapeWhenLoading
    >
      <Container>
        <div>
          {/* USUARIO  */}
          <Grid container alignItems="center">
            <Grid item xs={ 8 }>
              <InputText
                detached
                name="username"
                label={ t('user', { howMany: 1 }) }
                value={ user.username || '' }
                variant="outlined"
                disabled
                readOnly
              />
            </Grid>
          </Grid>

          {/* EMAIL E TELEFONE */}
          <Grid container alignItems="center">
            <Grid item xs={ 8 }>
              <InputText
                detached
                name="email"
                label="Email"
                value={ user.email || '' }
                variant="outlined"
                disabled
                readOnly
              />
            </Grid>
            <Grid item xs={ 4 }>
              <InputPhone
                detached
                name="phone"
                label={ t('phone', { howMany: 1 }) }
                value={ user.phone || '' }
                variant="outlined"
                disabled
                readOnly
              />
            </Grid>
          </Grid>

          {/* VINCULO E CODIGO DO REPRESENTANTE */}
          <Grid container alignItems="center" justify="space-between">
            <Checkbox
              detached
              style={ { marginLeft: 8 } }
              label={ t('link representative', { howMany: 1 }) }
              checked={ !isEmpty(userFromApi.representativeCodes) }
              readOnly
            />
            <Grid item sm={ 8 }>
              <InputText
                detached
                name="representCode"
                label="Cod. Representante"
                variant="outlined"
                value={ represetantiveName }
                disabled
                readOnly
              />
            </Grid>
          </Grid>

          {/* SUPLENTE, PERIODO E STATUS */}
          <Grid container alignItems="center" justify="space-between">
            <Grid item sm={ 8 }>
              <InputText
                detached
                name="suplent"
                label="Suplente"
                variant="outlined"
                fullWidth
                disabled
                value={ user.substituteUser?.username || '' }
                readOnly
              />
            </Grid>

            <Grid item>
              <InputDateRange
                detached
                name="period"
                width={ 200 }
                InputLabelProps={ { shrink: true } }
                readOnly
                value={ substituteUserPeriod }
                disabled
              />
            </Grid>
          </Grid>

          {/* PERFIS VINCULADOS */}
          <Grid container alignItems="center" justify="space-between">
            <AssociatedDataList
              detached
              value={ user.userProfiles }
              label={ t('linked profiles') }
              idKey="profileId"
            />
          </Grid>
        </div>

        <ActionsAndImage>
          <div>
            {currentRoutePermissions.EDITAR && (
              <Button
                className={ classes.linkButton }
                onClick={ onBindClick }
                size="medium"
                variant="outlined"
                startIcon={ <LinkIcon color={ colors.britSecondary.base } colorHover={ colors.britSecondary.base } /> }
              >
                <I18n>attach</I18n>
              </Button>
            )}
            {currentRoutePermissions.EDITAR && (
              <Button
                color="info"
                onClick={ onEditClick }
                size="medium"
                variant="outlined"
                startIcon={ <EditIcon color={ colors.info.main } colorHover={ colors.info.main } /> }
              >
                <I18n>edit</I18n>
              </Button>
            )}
            {currentRoutePermissions.EXCLUIR && (
              <Button
                onClick={ onDeleteClick }
                color="error"
                size="medium"
                variant="outlined"
                startIcon={ <DeleteIcon color={ colors.error.main } colorHover={ colors.error.main } /> }
              >
                <I18n>exclude</I18n>
              </Button>
            )}
          </div>

          <Image
            alt={ t('user profile') }
            src={ formatPathToCloudStorageUrl(user?.file?.path) }
          />
        </ActionsAndImage>
      </Container>
    </Modal>
  )
}

UserProfileModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  onSuccess: PropTypes.func,
  currentRoutePermissions: PropTypes.object
}

UserProfileModal.defaultProps = {
  user: {},
  onSuccess () {},
  currentRoutePermissions: {}
}

export default UserProfileModal
