import React, {
  useCallback,
  useMemo,
  useState
} from 'react'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'

import CommissionPercentageModal from '../../modals/commissionPercentageModal/CommissionPercentageModal'
import useStyles from '../styles'

const CommissionPercentage = ({ disabled, formRef }) => {
  const t = useT()
  const classes = useStyles()
  const { createDialog } = useDialog()

  const [commissionAndPorcentage, setCommissionAndPorcentage] = useState([])

  const columns = useMemo(() => [
    {
      title: t('establishment'),
      field: 'establishmentDescription',
      defaultSort: 'asc'
    },
    {
      title: t('child line'),
      field: 'lineDescription'
    },
    {
      title: t('commission'),
      field: 'commissionPercentage'
    }
  ], [t])

  const onAddClick = useCallback(
    () => {
      createDialog({
        id: 'create-commission',
        Component: CommissionPercentageModal,
        props: {
          commissionAndPorcentage,
          onSave (values, setLoading) {
            const newCommission = {
              establishmentCode: values.establishment.establishmentCode,
              establishmentDescription: values.establishment.establishmentDescription,
              lineCode: Number(values.childLine.lineCode),
              lineDescription: values.childLine.lineDescription,
              commissionPercentage: Number(values.commission)
            }
            formRef.current.setFieldValue('commissionPercentage', (old) => [...old, newCommission])
            setLoading(false)
          }
        }
      })
    }, [commissionAndPorcentage, createDialog, formRef])

  const onEditClick = useCallback((event, row) => {
    createDialog({
      id: 'edit-commission',
      Component: CommissionPercentageModal,
      props: {
        row,
        commissionAndPorcentage,
        onEdit (values, setLoading) {
          formRef.current.setFieldValue('commissionPercentage',
            (old) => {
              map(old, (item) => {
                if (item.tableData?.id === row?.tableData?.id) {
                  return {
                    establishmentCode: values.establishment.establishmentCode,
                    establishmentDescription: values.establishment.establishmentDescription,
                    lineCode: Number(values.childLine.lineCode),
                    lineDescription: values.childLine.lineDescription,
                    commissionPercentage: Number(values.commission),
                    tableData: item.tableData
                  }
                }
                return item
              })
              setLoading(false)
            }
          )
        }
      }
    })
  }, [commissionAndPorcentage, createDialog, formRef])

  const onDeleteClick = useCallback(
    (event, row) =>
      formRef.current.setFieldValue('commissionPercentage', (old) => filter(old, ({ tableData }) => tableData.id !== row.tableData.id))
    ,
    [formRef]
  )

  return (
    <Grid container spacing={ 1 } className={ classes.containerMain } >
      <DataTable
        data={ commissionAndPorcentage }
        columns={ columns }
        addTitle={ t('add new {this}', { gender: 'male', this: t('commission percentage') }) }
        onAddClick={ !disabled && onAddClick }
        onEditClick={ !disabled && onEditClick }
        onDeleteClick={ !disabled && onDeleteClick }
        options={ { search: false } }
      />
      <InputHidden name="commissionPercentage" onValueChange={ setCommissionAndPorcentage } showError/>
    </Grid>
  )
}

CommissionPercentage.propTypes = {
  disabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired
}

export default CommissionPercentage
