import React, {
  useMemo,
  useCallback
} from 'react'
import { useHistory } from 'react-router-dom'

import { find } from 'lodash'

import { useT } from '@britania-crm/i18n'
import { useBanksList } from '@britania-crm/services/apis/bancoCentralApi'
import { companies as CompaniesRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import { formatCpfCnpj } from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'

import { useRoutes } from '../../../../routes/authenticated.routes'
import { Container } from './styles'

const CompaniesListScreen = () => {
  const t = useT()
  const history = useHistory()
  const { routes, currentRoutePermissions } = useRoutes()

  const { data: banksList } = useBanksList()

  const columns = useMemo(() => [
    {
      title: t('company'),
      field: 'name'
    },
    {
      title: t('cnpj'),
      field: 'cnpj',
      render: (row) => formatCpfCnpj(row.cnpj)
    },
    {
      title: t('bank'),
      field: 'bankCode',
      render: (row) => find(banksList, { CodigoSicap: String(row.bankCode) })?.Nome
    }

  ], [banksList, t])

  const onAddClick = useCallback(
    () => {
      history.push(routes.newCompany.path)
    },
    [history, routes]
  )

  const onEditClick = useCallback((event, row) => {
    history.push(routes.editCompany.path, { params: { id: row.id } })
  }, [history, routes])

  const onViewClick = useCallback((event, row) => {
    history.push(routes.viewCompany.path, { params: { id: row.id } })
  }, [history, routes])

  return (
    <Container>
      <DataTable
        data={ CompaniesRoutes.getAll }
        columns={ columns }
        title={ t('companies') }
        addTitle={ t('add new {this}', { gender: 'female', this: t('company') }) }
        onAddClick={ currentRoutePermissions.INCLUIR && onAddClick }
        onEditClick={ currentRoutePermissions.EDITAR && onEditClick }
        onRowClick={ onViewClick }
        onGoBack={ history.goBack }
        addFilterTitle={ t('filter data') }
        emptyMessage={ t('buyer datagrid body empty data source message') }
        options={ { search: false } }
      />
    </Container>
  )
}

export default CompaniesListScreen
