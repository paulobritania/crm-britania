/* eslint-disable react/prop-types */
import React, {
  useMemo,
  useCallback,
  useEffect,
  useState
} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import isEmpty from 'lodash/isEmpty'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { workflows as workflowsCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { WorkflowActions } from '@britania-crm/stores/workflow'
import colors from '@britania-crm/styles/colors'
import { formatBackDateToFriendlyFormat } from '@britania-crm/utils/date'
import CheckboxStatus from '@britania-crm/web-components/CheckboxStatus'
import DataTable from '@britania-crm/web-components/DataTable'
import LightTooltip from '@britania-crm/web-components/LightTooltip'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import FilterWorkflowPanelModal from '../../modals/FilterWorkflowPanelModal/FilterWorkflowPanelModal'
import {
  Container,
  TableToolTipText
} from './styled'

const WorkflowPanelScreen = () => {
  const dispatch = useCallback(useDispatch(), [])
  const { routes, currentRoutePermissions } = useRoutes()
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})

  const {
    data,
    isValidating
    // mutate
  } = useCrmApi([workflowsCrmRoutes.getAll, filters], { params: filters })

  const t = useT()
  const { createDialog } = useDialog()

  useEffect(() => {
    dispatch(WorkflowActions.getWorkflowTypes())
  }, [dispatch])

  useEffect(() => {
    if (isEmpty(data) && isValidating) {
      setLoading(true)
    } else if (!isValidating) {
      setLoading(false)
    }
  }, [data, isValidating])

  const renderCellTooltip = useCallback((value) => (
    <LightTooltip title={ value } >
      <TableToolTipText>
        {value}
      </TableToolTipText>
    </LightTooltip>
  ), [])

  const columns = useMemo(() => [
    {
      title: t('title'),
      field: 'title',
      defaultSort: 'asc',
      render: (row) => renderCellTooltip(row.title)
    },
    {
      title: t('type'),
      field: 'type',
      render: (row) => renderCellTooltip(row.type)
    },
    {
      title: t('version'),
      field: 'version'
    },
    {
      title: t('date start'),
      field: 'dateStart',
      render: (row) => formatBackDateToFriendlyFormat(row.dateStart)
    },
    {
      title: t('date end'),
      field: 'dateEnd',
      render: (row) => formatBackDateToFriendlyFormat(row.dateEnd)
    },
    {
      sorting: false,
      title: t('status'),
      field: 'status',
      render (row) {
        let status, color

        if (row.status === 'ACTIVE') {
          status = t('running')
        } else if (row.status === 'PROGRAMMED') {
          status = t('programmed')
          color = colors.warning.main
        } else if (row.status === 'EXPIRED') {
          status = t('overdue')
          color = colors.orange.base
        }

        return (
          <CheckboxStatus
            detached
            readOnly
            value={ row.status !== 'INACTIVE' }
            style={ { color: colors.black2 } }
            activeStatus={ status }
            activeColor={ color }
          />
        )
      }
    }
  ], [renderCellTooltip, t])

  const handleOpenFilterModal = useCallback(() => {
    if (!isEmpty(filters)) {
      setFilters({})
    }

    createDialog({
      id: 'filterModal',
      Component: FilterWorkflowPanelModal,
      props: { handleSearch: setFilters }
    })
  }, [createDialog, filters])

  const onAddClick = useCallback(
    () => history.push(routes.workflowPanelCreate.path),
    [history, routes.workflowPanelCreate.path]
  )

  const onEditClick = useCallback((event, row) => {
    if (row.status === 'PROGRAMMED' || row.status === 'ACTIVE' || row.status === 'EXPIRED') {
      history.push(routes.workflowPanelEdit.path, { workflowId: row.id })
    }
  }, [history, routes.workflowPanelEdit.path])

  const onRowClick = useCallback((event, row) => {
    history.push(routes.workflowPanelView.path, { workflowId: row.id })
  }, [history, routes.workflowPanelView.path])

  const conditionToEdit = useCallback((row) => row.status === 'PROGRAMMED' || row.status === 'ACTIVE' || row.status === 'EXPIRED', [])

  return (
    <Container>
      <DataTable
        options={ { search: false } }
        data={ data }
        columns={ columns }
        loading={ loading }
        title={ t('workflow panel') }
        addFilterTitle={ t('filter data') }
        addTitle={ t('add new workflow') }
        onAddClick={ currentRoutePermissions.INCLUIR && onAddClick }
        onEditClick={ currentRoutePermissions.EDITAR && onEditClick }
        conditionToEdit={ conditionToEdit }
        onFilterClick={ handleOpenFilterModal }
        onRowClick={ onRowClick }
        onGoBack={ history.goBack }
        disableRowClick
      />
    </Container>
  )
}

export default WorkflowPanelScreen
