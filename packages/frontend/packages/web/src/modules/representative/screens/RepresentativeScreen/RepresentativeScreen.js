import React, {
  useCallback,
  useMemo,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'

import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'

import { useT } from '@britania-crm/i18n'
import { representative as representativeCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import colors from '@britania-crm/styles/colors'
import {
  trimMask,
  formatCpfCnpj,
  formatPhone
} from '@britania-crm/utils/formatters'
import CheckboxStatus from '@britania-crm/web-components/CheckboxStatus'
import DataTable from '@britania-crm/web-components/DataTable'
import PageFilter from '@britania-crm/web-components/PageFilter'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import RepresentativeFormFilter from '../../containers/representativeFormFilter'
import { Container } from './styles'

const RepresentativeScreen = () => {
  const t = useT()
  const history = useHistory()
  const { routes, currentRoutePermissions } = useRoutes()

  const [filters, setFilters] = useState({})

  const columns = useMemo(() => [
    {
      title: 'CNPJ',
      field: 'cnpj',
      render: (row) => formatCpfCnpj(row.cnpj)
    },
    {
      title: t('company name'),
      field: 'companyName'
    },
    {
      title: t('commercial phone'),
      field: 'commercialPhone',
      render: (row) => formatPhone(row.commercialPhone)
    },
    {
      title: t('short name'),
      field: 'representativeFinancial.shortName'
    },
    {
      title: t('email'),
      field: 'email'
    },
    {
      sorting: false,
      title: t('status'),
      field: 'status',
      render (row) {
        let status, color

        if (row.status === 'Em Aberto') {
          status = t('running')
        } else if (row.status === 'Concluído') {
          status = t('programmed')
          color = colors.warning.main
        } else if (row.status === 'Cancelado') {
          status = t('overdue')
          color = colors.error.main
        } else {
          status = t('workflow in progress')
          color = colors.orange.base
        }

        return (
          <CheckboxStatus
            detached
            readOnly
            value={ row.status !== 'Cancelado' }
            style={ { color: colors.black2 } }
            activeStatus={ status }
            activeColor={ color }
          />
        )
      }
    }
  ], [t])

  const onAddClick = useCallback(() => {
    history.push(routes.newRepresentative.path, { params: { mode: 'create', modeSave: 'save' } })
  }, [history, routes.newRepresentative.path])

  const onEditClick = useCallback((event, row) => {
    history.push(routes.editRepresentative.path, {
      params: {
        mode: 'edit',
        id: row.id,
        modeSave: 'conclude'
      }
    })
  }, [history, routes.editRepresentative.path])

  const onViewClick = useCallback((event, row) => {
    history.push(routes.viewRepresentative.path, {
      params: {
        mode: 'view',
        id: row.id
      }
    })
  }, [history, routes.viewRepresentative.path])

  const handleFilter = useCallback(
    (values) => {
      const payload = {
        ...values,
        cnpj: trimMask(values?.cnpj || '')
      }
      setFilters(pickBy(payload, identity))
    },
    []
  )

  return (
    <>
      <PageFilter
        Form={ RepresentativeFormFilter }
        handleFilter={ handleFilter }
      />
      <Container>
        <DataTable
          options={ { search: false } }
          data={ representativeCrmRoutes.getAll }
          filters={ filters }
          columns={ columns }
          title={ t('Pre registration {this}', { this: t('representative', { howMany: 1 }) }) }
          addTitle={ t('add new {this}', { gender: 'male', this: t('representative', { howMany: 1 }) }) }
          onAddClick={ currentRoutePermissions.INCLUIR && onAddClick }
          onEditClick={ currentRoutePermissions.EDITAR && onEditClick }
          onRowClick={ onViewClick }
          onGoBack={ history.goBack }
        />
      </Container>
    </>
  )
}

export default RepresentativeScreen
