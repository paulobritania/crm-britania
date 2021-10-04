import React, {
  useCallback,
  useMemo,
  useEffect
} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import map from 'lodash/map'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { messages as messagesCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { MessageActions } from '@britania-crm/stores/message'
import { ProfilesActions } from '@britania-crm/stores/profiles'
import { formatBackDateToFriendlyFormat } from '@britania-crm/utils/date'
import DataTable from '@britania-crm/web-components/DataTable'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import CreateMessageboardModal from '../../modals/CreateMessageboardModal/CreateMessageboardModal'
import { Container } from './styles'

const MessageboardScreen = () => {
  const t = useT()
  const dispatch = useCallback(useDispatch(), [])
  const { createDialog } = useDialog()
  const history = useHistory()
  const { currentRoutePermissions } = useRoutes()

  const {
    data,
    loading,
    mutate: refreshTable
  } = useCrmApi(messagesCrmRoutes.getFilter)

  const columns = useMemo(() => [
    {
      title: t('title'),
      field: 'title',
      defaultSort: 'asc'
    },
    {
      sorting: false,
      title: t('perfil'),
      field: 'messageProfile',
      render: (row) => map(row.messageProfile, (profile) => map(profile.profile, ({ name }) => name)).join(', ')
    },
    {
      title: t('validity'),
      field: 'expirationDate',
      render: (row) => formatBackDateToFriendlyFormat(row.expirationDate)
    }
  ], [t])

  const handleOpenMessageBoardModal = useCallback(
    (message) => {
      createDialog({
        id: 'messageBoardModal',
        Component: CreateMessageboardModal,
        props: {
          messageId: message?.id,
          onSave: refreshTable
        }
      })
    },
    [createDialog, refreshTable]
  )

  const onAddClick = useCallback(
    () => handleOpenMessageBoardModal(),
    [handleOpenMessageBoardModal]
  )

  const onEditClick = useCallback(
    (event, row) => handleOpenMessageBoardModal(row),
    [handleOpenMessageBoardModal]
  )

  const onDeleteClick = useCallback(
    (event, row) => {
      createDialog({
        id: 'delete-message',
        Component: ConfirmModal,
        props: {
          onConfirm () {
            dispatch(MessageActions.deleteMessage(row.id, refreshTable))
          }
        }
      })
    },
    [createDialog, dispatch, refreshTable]
  )

  // Função para carregar a lista de recados no primeiro carregamento da tela
  useEffect(() => {
    dispatch(ProfilesActions.getAllProfiles())
  }, [dispatch])

  return (
    <Container>
      <DataTable
        options={ { search: false } }
        data={ data }
        columns={ columns }
        loading={ loading }
        title={ t('message boards') }
        addTitle={ t('add new message') }
        onAddClick={ currentRoutePermissions.INCLUIR && onAddClick }
        onEditClick={ currentRoutePermissions.EDITAR && onEditClick }
        onDeleteClick={ currentRoutePermissions.EXCLUIR && onDeleteClick }
        onGoBack={ history.goBack }
      />
    </Container>
  )
}

export default MessageboardScreen
