import React, {
  useCallback,
  useMemo,
  useState
} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { isEmpty } from 'lodash'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { documents as documentsCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { DocumentsActions } from '@britania-crm/stores/documents'
import DataTable from '@britania-crm/web-components/DataTable'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import { Container } from './styles'

const DocumentationListScreen = () => {
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
  } = useCrmApi([documentsCrmRoutes.getAll])

  const loading = useMemo(() => loadingState || loadingHook, [loadingHook, loadingState])

  const columns = useMemo(() => [
    {
      title: t('title'),
      field: 'title'
    },
    {
      title: t('attachment'),
      field: 'file.filename'
    },
    {
      title: t('guidelines'),
      field: 'observation',
      render (row) {
        if (row?.observation && row?.observation.length > 20) {
          const newString = row?.observation.slice(0, 20)
          return newString.concat('...')
        }
        return row?.observation
      }
    }
  ], [t])

  const onEditClick = useCallback((event, row) => {
    history.push(routes.editDocumentation.path, {
      params: {
        mode: 'edit',
        alias: row.alias
      }
    })
  }, [history, routes])

  const handleDelete = useCallback((id) => {
    setLoading(true)
    dispatch(DocumentsActions.deleteDocument(id, () => {
      mutate()
      setLoading(false)
    }))
  }, [dispatch, mutate])

  const onDeleteClick = useCallback(
    (event, row) => createDialog({
      id: 'delete-document-modal',
      Component: ConfirmModal,
      props: {
        onConfirm () {
          handleDelete(row.id)
        }
      }
    }),
    [createDialog, handleDelete]
  )

  const onCreateClick = useCallback(
    () => {
      history.push(routes.newDocumentation.path, { params: { mode: 'create' } })
    },
    [history, routes]
  )

  // Foi feito esse método pois no momento só existe um tipo de documentação (pré cadastro de cliente)
  // No futuro, quando houverem mais, essa tabela se tornará genérica e será necessário inserir um inputselect
  // no componente de criação para determinar a página que irá a documentação
  const alreadyHavePreCadClient = useMemo(() => {
    if (isEmpty(data)) {
      return onCreateClick
    }
  }, [data, onCreateClick])

  return (
    <Container>
      <DataTable
        data={ data }
        columns={ columns }
        loading={ loading }
        title={ t('customer pre-registration {this}', { this: t('documentation', { howMany: 1 }) }) }
        addTitle={ t('add new {this}', { gender: 'male', this: t('document', { howMany: 1 }) }) }
        onAddClick={ currentRoutePermissions.INCLUIR && alreadyHavePreCadClient }
        onEditClick={ currentRoutePermissions.EDITAR && onEditClick }
        onDeleteClick={ currentRoutePermissions.EXCLUIR && onDeleteClick }
        onGoBack={ history.goBack }
        options={ { search: false } }
      />
    </Container>
  )
}

export default DocumentationListScreen
