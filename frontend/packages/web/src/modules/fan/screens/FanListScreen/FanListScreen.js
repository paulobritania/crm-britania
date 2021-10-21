import React, {
  useCallback,
  useMemo,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'

import find from 'lodash/find'

import { useT } from '@britania-crm/i18n'
import {
  fan as fanCrmRoutes,
  linesMaster as lineMasterCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { formatBackDateToFriendlyFormat } from '@britania-crm/utils/date'
import DataTable from '@britania-crm/web-components/DataTable'
import PageFilter from '@britania-crm/web-components/PageFilter'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import FanFormFilter from '../../containers/FanFormFilter'
import { Container } from './styles'

const FanListScreen = () => {
  const t = useT()
  const { routes, currentRoutePermissions } = useRoutes()
  const history = useHistory()

  const { data: linesMasterFromApi } = useCrmApi(lineMasterCrmRoutes.getAll)

  const [filters, setFilters] = useState({ company: 'BRITÂNIA' })

  const columns = useMemo(() => [
    {
      title: t('number fan'),
      field: 'number'
    },
    {
      title: t('company'),
      field: 'company'
    },
    {
      title: t('matrix'),
      field: 'parentCompanyName'
    },
    {
      title: t('responsible', { howMany: 1 }),
      field: 'responsible'
    },
    {
      title: t('regional manager'),
      field: 'regionalManager'
    },
    {
      title: t('board'),
      field: 'directorship',
      render: (row) => find(linesMasterFromApi, ({ masterLineCode }) => masterLineCode === row.directorship)?.masterLineDescription
    },
    {
      title: t('start date'),
      field: 'startDate',
      render: (row) => formatBackDateToFriendlyFormat(row.startDate)
    },
    {
      title: t('end date'),
      field: 'endDate',
      render: (row) => formatBackDateToFriendlyFormat(row.endDate)
    },
    {
      title: t('porcentage'),
      field: 'porcentage'
    }
  ], [linesMasterFromApi, t])

  const onRowClick = useCallback((event, row) => {
    history.push(routes.viewFan.path, { params: { id: row.id } })
  }, [history, routes])

  const handleFilter = useCallback(
    (values) => {
      setFilters(values)
    },
    []
  )

  const onCreateClick = useCallback(
    () => {
      history.push(routes.newFan.path)
    },
    [history, routes]
  )

  return (
    <>
      <PageFilter
        handleFilter={ handleFilter }
        Form={ FanFormFilter }
      />
      <Container>
        <DataTable
          data={ fanCrmRoutes.getAll }
          filters={ filters }
          columns={ columns }
          title={ t('register of {this}', { this: 'FAN' }) }
          addTitle={ t('add new {this}', {
            gender: 'male',
            this: 'FAN'
          }) }
          onAddClick={ currentRoutePermissions.INCLUIR && onCreateClick }
          onRowClick={ onRowClick }
          onGoBack={ history.goBack }
          addFilterTitle={ t('filter data') }
          emptyMessage={ t('{this} datagrid body empty data source message', { this: 'FAN' }) }
          options={ { search: false } }
        />
      </Container>
    </>
  )
}

export default FanListScreen
