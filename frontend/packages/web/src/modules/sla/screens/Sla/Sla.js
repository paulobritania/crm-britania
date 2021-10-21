import React, {
  useMemo,
  useCallback
} from 'react'
import { useHistory } from 'react-router-dom'

import AccessTimeIcon from '@material-ui/icons/AccessTime'

import { useT } from '@britania-crm/i18n'
import { sla as SlaRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import { colors } from '@britania-crm/styles'
import { formatBackDateToFriendlyFormat } from '@britania-crm/utils/date'
import DataTable from '@britania-crm/web-components/DataTable'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import {
  Container,
  TableText
} from './styles'

const Sla = () => {
  const t = useT()
  const history = useHistory()
  const { routes } = useRoutes()

  const columns = useMemo(() => [
    {
      title: 'SLA',
      field: 'expirationTime',
      render (row) {
        let color = colors.error.main
        if (row.expirationTime === 'GREEN') {
          color = colors.success.main
        }
        if (row.expirationTime === 'YELLOW') {
          color = colors.warning.main
        }

        return (
          <AccessTimeIcon
            htmlColor={ color }
            fontSize="default"
          />
        )
      }
    },
    {
      title: 'Data de vencimento',
      field: 'dueDate',
      render: (row) => (
        <TableText expirationTime={ row.expirationTime }>{
          formatBackDateToFriendlyFormat(row.dueDate)
        }</TableText>
      )
    },
    {
      title: 'Tipo de pendência',
      field: 'workflowType',
      render: (row) => (
        <TableText expirationTime={ row.expirationTime }>{
          row.workflowType
        }</TableText>
      )
    },
    {
      title: 'Tarefa',
      field: 'taskName'
    },
    {
      title: 'Matriz',
      field: 'parentCompanyName'
    }

  ], [])

  const onRowClick = useCallback((event, row) => {
    if (routes.editCustomer) {
      history.push(routes.editCustomer.path, { params: { id: row.workflowIdentifier, mode: 'edit' } })
    }
  }, [history, routes])

  return (
    <>
      <Container>
        <DataTable
          data={ SlaRoutes.getAll }
          columns={ columns }
          title={ t('all slas') }
          onGoBack={ history.goBack }
          addFilterTitle={ t('filter data') }
          emptyMessage={ t('buyer datagrid body empty data source message') }
          options={ { search: false } }
          onRowClick={ onRowClick }
        />
      </Container>
    </>
  )
}

export default Sla
