import React, {
  useCallback,
  useMemo,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'

import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'

import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'

import { useT } from '@britania-crm/i18n'
import { customer as customerCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import { trimMask } from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'
import PageFilter from '@britania-crm/web-components/PageFilter'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import CompaniesBranchTable from '../../components/CompaniesBranch'
import CustomerFormFilter from '../../components/customerFormFilter'
import { getConfigClientsColumns } from '../../utils'
import {
  Container,
  CompaniesBranch
} from './styles'

const CustomerScreen = () => {
  const t = useT()
  const history = useHistory()
  const { routes, currentRoutePermissions } = useRoutes()

  const [filters, setFilters] = useState({})

  const columns = useMemo(() => getConfigClientsColumns(t), [t])

  const onAddClick = useCallback(() => {
    history.push(routes.newCustomerPreRegistration.path, { params: { mode: 'create' } })
  }, [history, routes])

  const onEditClick = useCallback((event, row) => {
    if (row.clientRegistrationType === 'PRE_REGISTRATION') {
      history.push(routes.editCustomerPreRegistration.path, {
        params: {
          mode: 'edit',
          id: row.id
        }
      })
    } else {
      history.push(routes.editCustomer.path, {
        params: {
          mode: 'edit',
          id: row.parentCompanyCode
        }
      })
    }
  }, [history, routes])

  const addMicroActions = useMemo(() => [
    {
      title: t('customer request'),
      action: (row) => console.log('test 1 ', row)
    },
    {
      title: t('customer detail'),
      action (row) {
        if (row.clientRegistrationType === 'PRE_REGISTRATION') {
          history.push(routes.viewCustomerPreRegistration.path, {
            params: {
              mode: 'view',
              id: row.id
            }
          })
        } else {
          history.push(routes.viewCustomer.path, {
            params: {
              mode: 'view',
              id: row.parentCompanyCode
            }
          })
        }
      }
    },
    { title: t('vpc panel'), action: (row) => console.log('test 3', row) },
    { title: t('customer wallet'), action: (row) => console.log('test 4', row) },
    { title: t('pre-registration history'), action: (row) => console.log('test 5', row) }
  ], [history, routes, t])

  const handleFilter = useCallback(
    async (values) => {
      const payload = {
        ...values,
        clientGroup: values?.clientGroup?.codeClientGroup,
        regionalManager: values?.regionalManager?.code,
        workflowTaskId: values?.workflowTaskId?.id,
        cnpj: trimMask(values.cnpj)
      }
      const params = pickBy(payload, identity)
      setFilters(params)
    },
    []
  )

  return (
    <>
      <PageFilter
        Form={ CustomerFormFilter }
        handleFilter={ handleFilter }
        filters={ filters }
      />
      <Container>
        <DataTable
          options={ { search: false } }
          data={ customerCrmRoutes.getAll }
          filters={ { clientRegistrationType: 'REGISTER', ...filters } }
          columns={ columns }
          title={ t('customers consultation') }
          addTitle={ t('add new {this}', { gender: 'male', this: t('customer', { howMany: 1 }) }) }
          addMicroActions={ addMicroActions }
          onAddClick={ currentRoutePermissions.INCLUIR && onAddClick }
          onEditClick={ currentRoutePermissions.EDITAR && onEditClick }
          onGoBack={ history.goBack }
          detailPanel = { [{
            icon: Add,
            openIcon: Remove,
            iconProps: { fontSize: 'small' },
            tooltip: t('view more'),
            render: (rowData) => (
              <CompaniesBranch>
                <CompaniesBranchTable id={ rowData?.parentCompanyCode }/>
              </CompaniesBranch>
            )
          }]
          }
        />
      </Container>
    </>
  )
}

export default CustomerScreen
