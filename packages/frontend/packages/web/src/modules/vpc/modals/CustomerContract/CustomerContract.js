import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import { reports as reportsRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { formatMoney } from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'
import Modal from '@britania-crm/web-components/Modal'

const CustomerContract = ({
  id, open, parentCompanyCode, responsibleCode
}) => {
  const t = useT()

  const paramsContractual = useMemo(
    () =>
      ({ parentCompanyCodes: parentCompanyCode.toString(), responsibleCode }),
    [parentCompanyCode, responsibleCode])

  const {
    data,
    loading
  } = useCrmApi(
    parentCompanyCode || responsibleCode
      ? [reportsRoutes.getContractualPercentage, paramsContractual]
      : null,
    { params: paramsContractual }
  )

  const columns = useMemo(() => [
    {
      title: t('percentage'),
      field: 'contractualPercentage',
      sorting: false,
      render: (row) => `${ row.contractualPercentage }%`
    },
    {
      title: t('value', { howMany: 1 }),
      field: 'value',
      sorting: false,
      render: (row) => formatMoney(row.value)
    },
    {
      title: t('name', { howMany: 1 }),
      field: 'budgetContractName',
      sorting: false
    },
    {
      title: t('type'),
      field: 'contractType',
      sorting: false
    },
    {
      title: t('line', { howMany: 1 }),
      field: 'lineName',
      sorting: false
    },
    {
      title: t('frequency', { howMany: 1 }),
      field: 'periodicity',
      sorting: false
    }
  ], [t])

  return (
    <Modal
      id={ id }
      open={ open }
      title={ t('customer contract information') }
      maxWidth="md"
      fullWidth
      escapeWhenLoading
    >
      <Grid container item sm={ 12 }>
        <DataTable
          data={ data }
          columns={ columns }
          loading={ loading }
          titleProps={ { style: { fontSize: 22 } } }
          minimalistToolbar
          options={ { search: false } }
        />
      </Grid>
    </Modal>
  )
}

CustomerContract.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  parentCompanyCode: PropTypes.number,
  responsibleCode: PropTypes.string
}

CustomerContract.defaultProps = {
  data: [],
  parentCompanyCode: 0,
  responsibleCode: ''
}

export default CustomerContract
