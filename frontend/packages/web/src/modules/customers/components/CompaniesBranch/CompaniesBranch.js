import React, {
  useCallback,
  useMemo,
  memo
} from 'react'
import { useHistory } from 'react-router-dom'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import { clients } from '@britania-crm/services/apis/crmApi/resources/routes'
import DataTable from '@britania-crm/web-components/DataTable'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import { getConfigsCompanysBranchColumns } from '../../utils'
import useStyles from './styles'

const CompaniesBranchTable = ({ id }) => {
  const t = useT()
  const classes = useStyles()
  const history = useHistory()
  const { routes, currentRoutePermissions } = useRoutes()

  const columns = useMemo(
    () => getConfigsCompanysBranchColumns(t),
    [t]
  )

  const addMicroActions = useMemo(() => [
    { title: t('customer request'), action: (row) => console.log('test 1 ', row) },
    {
      title: t('customer detail'),
      action (row) {
        history.push(routes.viewCustomer.path, {
          params: {
            mode: 'view',
            id: row.branchCode
          }
        })
      }
    },
    { title: t('vpc panel'), action: (row) => console.log('test 3', row) },
    { title: t('customer wallet'), action: (row) => console.log('test 4', row) },
    { title: t('pre-registration history'), action: (row) => console.log('test 5', row) }
  ], [history, routes, t])

  const onEditClick = useCallback(
    (_, row) => {
      history.push(routes.editCustomer.path, {
        params: {
          mode: 'edit',
          id: row.branchCode
        }
      })
    },
    [history, routes]
  )

  return (
    <Grid
      container
      spacing={ 1 }
      direction="row"
      justify="center"
      alignItems="center"
      className={ classes.table }
    >
      <DataTable
        options={ { search: false } }
        data={ clients.getParentCompaniesBranchesUrl(id) }
        columns={ columns }
        addMicroActions={ addMicroActions }
        onEditClick={ currentRoutePermissions.EDITAR && onEditClick }
      />
    </Grid>
  )
}

CompaniesBranchTable.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

export default memo(CompaniesBranchTable)
