import React, {
  useCallback,
  useMemo
} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import map from 'lodash/map'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { users as usersCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { UsersActions } from '@britania-crm/stores/users'
import { formatPathToCloudStorageUrl } from '@britania-crm/utils/files'
import Avatar from '@britania-crm/web-components/Avatar'
import DataTable from '@britania-crm/web-components/DataTable'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import NewUserModal from '../../modals/NewUserModal'
import UserProfileModal from '../../modals/UserProfileModal'
import { Container } from './styles'

const UsersListScreen = () => {
  const t = useT()
  const { createDialog } = useDialog()
  const dispatch = useCallback(useDispatch(), [])
  const history = useHistory()
  const { currentRoutePermissions } = useRoutes()

  const {
    data,
    loading,
    mutate
  } = useCrmApi(usersCrmRoutes.list)

  const columns = useMemo(() => [
    {
      sorting: false,
      searchable: false,
      width: 75,
      align: 'center',
      title: t('image', { howMany: 1 }),
      render: (row) => (
        <Avatar
          index={ row.id }
          src={ formatPathToCloudStorageUrl(row?.file?.path) }
        />
      )
    },
    {
      title: t('user', { howMany: 1 }),
      field: 'username',
      width: 250
    },
    {
      title: t('profile', { howMany: 2 }),
      field: 'userProfiles',
      sorting: false,
      searchable: false,
      render: (row) => map(row.userProfiles, (profile) => profile.name).join(', ')
    }
  ], [t])

  const onRowClick = useCallback(
    (event, row) => createDialog({
      id: 'user-details-modal',
      Component: UserProfileModal,
      props: {
        user: row,
        currentRoutePermissions,
        onSuccess: mutate
      }
    }),
    [createDialog, currentRoutePermissions, mutate]
  )

  const onAddClick = useCallback(
    () => createDialog({
      id: 'new-user-modal',
      Component: NewUserModal,
      props: { onSuccess: mutate }
    }),
    [createDialog, mutate]
  )

  const onEditClick = useCallback(
    (event, row) => createDialog({
      id: 'edit-user-modal',
      Component: NewUserModal,
      props: {
        userId: row.id,
        onSuccess: mutate
      }
    }),
    [createDialog, mutate]
  )

  const onDeleteClick = useCallback(
    (event, row) => createDialog({
      id: 'delete-user-modal',
      Component: ConfirmModal,
      props: {
        onConfirm () {
          dispatch(UsersActions.removeUser(row.id, mutate))
        }
      }
    }),
    [createDialog, dispatch, mutate]
  )

  return (
    <Container>
      <DataTable
        data={ data }
        columns={ columns }
        loading={ loading }
        title={ t('control of {this}', { this: t('user', { howMany: 2 }) }) }
        searchPlaceholder={ t('search by {this}', { this: t('name', { howMany: 1 }) }) }
        addTitle={ t('add new {this}', { gender: 'male', this: t('user', { howMany: 1 }) }) }
        onAddClick={ currentRoutePermissions.INCLUIR && onAddClick }
        onEditClick={ currentRoutePermissions.EDITAR && onEditClick }
        onDeleteClick={ currentRoutePermissions.EXCLUIR && onDeleteClick }
        onRowClick={ onRowClick }
        onGoBack={ history.goBack }
      />
    </Container>
  )
}

export default UsersListScreen
