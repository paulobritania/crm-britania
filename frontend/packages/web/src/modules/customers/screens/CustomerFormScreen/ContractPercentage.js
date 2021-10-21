import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import colors from '@britania-crm/styles/colors'
import { formatFriendlyDateFromBackFormat } from '@britania-crm/utils/date'
import CheckboxStatus from '@britania-crm/web-components/CheckboxStatus'
import CustomAccordion from '@britania-crm/web-components/CustomAccordion'
import DataTable from '@britania-crm/web-components/DataTable'

import useStyles from './styles'

const ContractPercentage = ({ data, handleDocumentation }) => {
  const t = useT()
  const classes = useStyles()

  const columns = useMemo(() => [
    {
      title: t('percentage'),
      field: 'percentual',
      defaultSort: 'asc'
    },
    {
      title: t('number', { howMany: 1 }),
      field: 'number',
      defaultSort: 'asc'
    },
    {
      title: t('name', { howMany: 1 }),
      field: 'name',
      defaultSort: 'asc'
    },
    {
      title: t('line', { howMany: 1 }),
      field: 'line',
      defaultSort: 'asc'
    },
    {
      title: t('family', { howMany: 1 }),
      field: 'family',
      defaultSort: 'asc'
    },
    {
      title: t('frequency', { howMany: 1 }),
      field: 'periodicity',
      defaultSort: 'asc'
    },
    {
      title: t('start date'),
      field: 'startDate',
      defaultSort: 'asc',
      render: (row) => row.startDate ? formatFriendlyDateFromBackFormat(row.startDate) : '-'
    },
    {
      title: t('end date'),
      field: 'endDate',
      defaultSort: 'asc',
      render: (row) => row.endDate ? formatFriendlyDateFromBackFormat(row.endDate) : '-'
    },
    {
      title: t('status'),
      field: 'status',
      defaultSort: 'asc',
      render: (row) => (
        <CheckboxStatus
          detached
          readOnly
          style={ { color: colors.black2 } }
          value={ row.active }
        />
      )
    }
  ], [t])

  return (
    <CustomAccordion header={ t('contract {this}', { this: t('percentage') }) } handleInfo={ handleDocumentation }>
      <Grid container item sm={ 12 } className={ classes.contractPercentage }>
        <DataTable
          data={ data }
          columns={ columns }
          loading={ false }
          title={ t('list of percentage contract') }
          titleProps={ { style: { fontSize: 22 } } }
          minimalistToolbar
          options={ { search: false } }
        />
      </Grid>
    </CustomAccordion>
  )
}

ContractPercentage.propTypes = { data: PropTypes.array, handleDocumentation: PropTypes.func }

ContractPercentage.defaultProps = { data: [], handleDocumentation () {} }

export default ContractPercentage
