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
import InputText from '@britania-crm/web-components/InputText'

import AchivementsModal from '../../modals/AchivementsModal/AchivementsModal'

const OtherNegotiatedFunds = ({
  isDisabled,
  formRef,
  slaghterReturnOptions,
  rangeOptions,
  calculationOptions,
  basisOfCalculationOptions
}) => {
  const t = useT()
  const { createDialog } = useDialog()

  const [percentage, setPercentage] = useState([])

  const columns = useMemo(() => [
    {
      title: t('frequency', { howMany: 1 }),
      field: 'periodicity',
      render: (row) => lowerAndStartCase(row.periodicity)
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
    },
    {
      title: t('start percentage'),
      field: 'startPercentage'
    },
    {
      title: t('end percentage'),
      field: 'endPercentage'
    },
    {
      title: t('bonus'),
      field: 'bonus'
    },
    {
      title: t('basis of calculation'),
      field: 'basisOfCalculation',
      render: (row) => lowerAndStartCase(row.basisOfCalculation)
    }
  ], [t])

  const onCreateClick = useCallback(
    () => createDialog({
      id: 'add-new-achivements-modal',
      Component: AchivementsModal,
      props: {
        slaghterReturnOptions,
        rangeOptions,
        calculationOptions,
        basisOfCalculationOptions,
        onSubmit (porcentage) {
          formRef.current.setFieldValue('fan.achivements', (old) => [...old, porcentage])
        }
      }
    }),
    [basisOfCalculationOptions, calculationOptions, createDialog, formRef, rangeOptions, slaghterReturnOptions]
  )

  const onEditClick = useCallback(
    (event, row) => createDialog({
      id: 'add-edit-achivements-modal',
      Component: AchivementsModal,
      props: {
        slaghterReturnOptions,
        rangeOptions,
        calculationOptions,
        basisOfCalculationOptions,
        row,
        onSubmit (porcentage) {
          formRef.current.setFieldValue('fan.achivements',
            (old) =>
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
    [basisOfCalculationOptions, calculationOptions, createDialog, formRef, rangeOptions, slaghterReturnOptions]
  )

  const onDeleteClick = useCallback(
    (event, row) => {
      formRef.current.setFieldValue('fan.achivements', (old) => filter(old, ({ tableData }) => tableData.id !== row?.tableData?.id))
    },
    [formRef]
  )

  return (
    <Grid container spacing={ 1 }>
      <Grid item sm={ 12 }>
        <DataTable
          data={ percentage }
          columns={ columns }
          addTitle={ t('add new {this}', {
            gender: 'female',
            this: t('bonus')
          }) }
          onAddClick={ !isDisabled && onCreateClick }
          onEditClick={ !isDisabled && onEditClick }
          onDeleteClick={ !isDisabled && onDeleteClick }
          emptyMessage={ t('{this} datagrid body empty data source message', { this: t('bonus') }) }
          options={ { search: false } }
        />
        <InputHidden
          name="achivements"
          showError
          onValueChange={ setPercentage }
        />
      </Grid>
      <Grid item sm={ 12 }>
        <InputText
          label={ t('observation', { howMany: 1 }) }
          name="observation"
          disabled={ isDisabled }
        />
      </Grid>
    </Grid>
  )
}

OtherNegotiatedFunds.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired,
  slaghterReturnOptions: PropTypes.array.isRequired,
  rangeOptions: PropTypes.array.isRequired,
  calculationOptions: PropTypes.array.isRequired,
  basisOfCalculationOptions: PropTypes.array.isRequired
}

OtherNegotiatedFunds.defaultProps = {}

export default OtherNegotiatedFunds
