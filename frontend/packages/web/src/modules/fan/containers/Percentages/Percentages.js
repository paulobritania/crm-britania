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

import PercentagesModal from '../../modals/PercentagesModal'

const Percentages = ({
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

  const [percentages, setPercentages] = useState([])

  const columns = useMemo(() => [
    {
      title: t('percentage'),
      field: 'percentage'
    },
    {
      title: t('calculation basis'),
      field: 'determinationBasis',
      render: (row) => lowerAndStartCase(row.determinationBasis)
    },
    {
      title: t('description'),
      field: 'budgetDescription',
      render: (row) => lowerAndStartCase(row.budgetDescription)
    },
    {
      title: t('frequency', { howMany: 1 }),
      field: 'periodicity',
      render: (row) => lowerAndStartCase(row.periodicity)
    },
    {
      title: t('discount'),
      field: 'discount'
    },
    {
      title: t('basis of calculation'),
      field: 'basisOfCalculation',
      render: (row) => lowerAndStartCase(row.basisOfCalculation)
    },
    {
      title: t('slaughter return'),
      field: 'slaughterReturn',
      render: (row) => row.slaughterReturn ? 'Sim' : 'Não'
    }
  ], [t])

  const onCreateClick = useCallback(
    () => createDialog({
      id: 'add-new-porcentages-modal',
      Component: PercentagesModal,
      props: {
        slaghterReturnOptions,
        rangeOptions,
        calculationOptions,
        basisOfCalculationOptions,
        descontOptions,
        onSubmit (porcentage) {
          formRef.current.setFieldValue('fan.percentages', (old) => [...old, porcentage])
        }
      }
    }),
    [basisOfCalculationOptions, calculationOptions, createDialog, descontOptions, formRef, rangeOptions, slaghterReturnOptions]
  )

  const onEditClick = useCallback(
    (event, row) => createDialog({
      id: 'add-edit-porcentages-modal',
      Component: PercentagesModal,
      props: {
        slaghterReturnOptions,
        rangeOptions,
        calculationOptions,
        basisOfCalculationOptions,
        descontOptions,
        row,
        onSubmit (porcentage) {
          formRef.current.setFieldValue('fan.percentages', (old) =>
            map(old, (item) => {
              if (item.tableData?.id === row?.tableData?.id) {
                return { ...porcentage, tableData: item.tableData }
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
      formRef.current.setFieldValue('fan.percentages', (old) => filter(old, ({ tableData }) => tableData?.id !== row?.tableData?.id))
    },
    [formRef]
  )

  return (
    <Grid container spacing={ 1 }>
      <DataTable
        data={ percentages }
        columns={ columns }
        addTitle={ t('add new {this}', {
          gender: 'female',
          this: t('percentage description')
        }) }
        onAddClick={ !isDisabled && onCreateClick }
        onEditClick={ !isDisabled && onEditClick }
        onDeleteClick={ !isDisabled && onDeleteClick }
        emptyMessage={ t('{this} datagrid body empty data source message', { this: t('percentage description') }) }
        options={ { search: false } }
      />
      <InputHidden
        name="percentages"
        showError
        onValueChange={ setPercentages }
      />
    </Grid>
  )
}

Percentages.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired,
  slaghterReturnOptions: PropTypes.array.isRequired,
  rangeOptions: PropTypes.array.isRequired,
  calculationOptions: PropTypes.array.isRequired,
  basisOfCalculationOptions: PropTypes.array.isRequired,
  descontOptions: PropTypes.array.isRequired
}

Percentages.defaultProps = {}

export default Percentages
