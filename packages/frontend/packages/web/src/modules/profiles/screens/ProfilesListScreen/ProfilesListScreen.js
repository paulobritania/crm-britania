/* eslint-disable react/display-name */
import React, {
  useState,
  useCallback,
  useMemo
} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { profiles as profilesCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { ProfilesActions } from '@britania-crm/stores/profiles'
import DataTable from '@britania-crm/web-components/DataTable'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import StatusSwitch from '@britania-crm/web-components/StatusSwitch'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import LinkProfileUserModal from '../../modals/LinkProfileUserModal'
import { Container } from './styles'

const ProfilesListScreen = () => {
  const t = useT()
  const dispatch = useCallback(useDispatch(), [])
  const { createDialog } = useDialog()
  const { routes, currentRoutePermissions } = useRoutes()
  const history = useHistory()

  const [loadingState, setLoading] = useState(false)

  const {
    data,
    loading: loadingHook,
    mutate
  } = useCrmApi([profilesCrmRoutes.list])

  const loading = useMemo(() => loadingState || loadingHook, [loadingHook, loadingState])

  const handleUpdateStatus = useCallback((id) => {
    setLoading(true)
    dispatch(ProfilesActions.patchProfileStatus(id, () => {
      mutate()
      setLoading(false)
    }))
  }, [dispatch, mutate])

  const columns = useMemo(() => [
    {
      title: t('profile', { howMany: 1 }),
      field: 'name',
      defaultSort: 'asc'
    },
    {
      sorting: false,
      title: t('status'),
      field: 'active',
      render: (row) => (
        <StatusSwitch
          detached
          name="status"
          value={ row.active }
          onChange={ () => handleUpdateStatus(row.id) }
          disabled={ !currentRoutePermissions.INATIVAR }
        />
      )
    }
  ], [currentRoutePermissions.INATIVAR, handleUpdateStatus, t])

  const handleDelete = useCallback((id) => {
    setLoading(true)
    dispatch(ProfilesActions.deleteProfile(id, () => {
      mutate()
      setLoading(false)
    }))
  }, [dispatch, mutate])

  const onAddClick = useCallback(
    () => history.push(routes.newProfile.path),
    [history, routes.newProfile]
  )

  const onBindClick = useCallback((event, row) => {
    createDialog({
      id: 'link-profile-modal',
      Component: LinkProfileUserModal,
      props: {
        profileId: row.id,
        profileName: row.name,
        enableLoading: true
      }
    })
  }, [createDialog])

  const onEditClick = useCallback((event, row) => {
    history.push(routes.editProfile.path, { profileId: row.id })
  }, [history, routes.editProfile.path])

  const onDeleteClick = useCallback(
    (event, row) => createDialog({
      id: 'delete-profile-modal',
      Component: ConfirmModal,
      props: {
        onConfirm () {
          handleDelete(row.id)
        }
      }
    }),
    [createDialog, handleDelete]
  )

  return (
    <Container>
      <DataTable
        data={ data }
        columns={ columns }
        searchPlaceholder={ t('search by {this}', { this: t('profile', { howMany: 1 }) }) }
        loading={ loading }
        title={ t('profiles control') }
        addTitle={ t('add new profile') }
        onAddClick={ currentRoutePermissions.INCLUIR && onAddClick }
        onBindClick={ currentRoutePermissions.EDITAR && onBindClick }
        onEditClick={ currentRoutePermissions.EDITAR && onEditClick }
        onDeleteClick={ currentRoutePermissions.EXCLUIR && onDeleteClick }
        onGoBack={ history.goBack }
      />
    </Container>
  )
}

export default ProfilesListScreen
