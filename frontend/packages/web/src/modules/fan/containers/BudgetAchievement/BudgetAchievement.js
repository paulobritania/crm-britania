import React, {
  useMemo,
  useCallback,
  useState
} from 'react'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { lowerAndStartCase } from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'

import NegotiatedFundsModal from '../../modals/NegotiatedFundsModal'

const BudgetAchievement = ({
  isDisabled,
  formRef,
  slaghterReturnOptions,
  rangeOptions,
  calculationOptions,
  basisOfCalculationOptions,
  descontOptions
}) => {
  const t = useT()
  const { createDialog } = useDialog()

  const [negotiatedFunds, setNegotiatedFunds] = useState([])

  const columns = useMemo(() => [
    {
      title: t('value'),
      field: 'value',
      render: (row) => `${ row.value }%`
    },
    {
      title: t('description'),
      field: 'description',
      render: (row) => lowerAndStartCase(row.description)
    },
    {
      title: t('frequency', { howMany: 1 }),
      field: 'periodicity',
      render: (row) => lowerAndStartCase(row.periodicity)
    },
    {
      title: t('discount'),
      field: 'discount',
      render: (row) => lowerAndStartCase(row.discount)
    },
    {
      title: t('basis of calculation'),
      field: 'basisOfCalculation',
      render: (row) => lowerAndStartCase(row.basisOfCalculation)
    },
    {
      title: t('calculation basis'),
      field: 'determinationBasis',
      render: (row) => lowerAndStartCase(row.determinationBasis)
    },
    {
      title: t('slaughter return'),
      field: 'slaughterReturn',
      render: (row) => row.slaughterReturn ? 'Sim' : 'Não'
    }
  ], [t])

  const onCreateClick = useCallback(
    () => createDialog({
      id: 'add-new-negotiated-funds-modal',
      Component: NegotiatedFundsModal,
      props: {
        slaghterReturnOptions,
        rangeOptions,
        calculationOptions,
        basisOfCalculationOptions,
        descontOptions,
        onSubmit (values) {
          formRef.current.setFieldValue('fan.negotiatedFunds', (old) => [...old, values])
        }
      }
    }),
    [basisOfCalculationOptions, calculationOptions, createDialog, descontOptions, formRef, rangeOptions, slaghterReturnOptions]
  )

  const onEditClick = useCallback(
    (event, row) => createDialog({
      id: 'add-edit-negotiated-funds-modal',
      Component: NegotiatedFundsModal,
      props: {
        slaghterReturnOptions,
        rangeOptions,
        calculationOptions,
        basisOfCalculationOptions,
        descontOptions,
        row,
        onSubmit (values) {
          formRef.current.setFieldValue('fan.negotiatedFunds',
            (old) =>
              map(old, (item) => {
                if (item.tableData?.id === row?.tableData?.id) {
                  return { ...values, tableData: item.tableData }
                }
                return item
              })
          )
        }
      }
    }),
    [basisOfCalculationOptions, calculationOptions, createDialog, descontOptions, formRef, rangeOptions, slaghterReturnOptions]
  )

  const onDeleteClick = useCallback(
    (event, row) => {
      formRef.current.setFieldValue('fan.negotiatedFunds', (old) => filter(old, ({ tableData }) => tableData?.id !== row?.tableData?.id))
    },
    [formRef]
  )

  return (
    <Grid container spacing={ 1 }>
      <DataTable
        data={ negotiatedFunds }
        columns={ columns }
        addTitle={ t('add new {this}', {
          gender: 'male',
          this: t('budget', { howMany: 1 })
        }) }
        onAddClick={ !isDisabled && onCreateClick }
        onEditClick={ !isDisabled && onEditClick }
        onDeleteClick={ !isDisabled && onDeleteClick }
        emptyMessage={ t('{this} datagrid body empty data source message', { this: t('budget', { howMany: 2 }) }) }
        options={ { search: false } }
      />
      <InputHidden
        name="negotiatedFunds"
        showError
        onValueChange={ setNegotiatedFunds }
      />
    </Grid>
  )
}

BudgetAchievement.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired,
  slaghterReturnOptions: PropTypes.array.isRequired,
  rangeOptions: PropTypes.array.isRequired,
  calculationOptions: PropTypes.array.isRequired,
  basisOfCalculationOptions: PropTypes.array.isRequired,
  descontOptions: PropTypes.array.isRequired
}

BudgetAchievement.defaultProps = {}

export default BudgetAchievement
