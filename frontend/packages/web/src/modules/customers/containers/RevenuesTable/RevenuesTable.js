import React, {
  useMemo,
  useCallback,
  useState
} from 'react'

import moment from 'moment/moment'
import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import map from 'lodash/map'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { formatMoney } from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import NewRevenueModal from '@britania-crm/web-src/modules/customers/modals/NewRevenueModal'

const RevenuesTable = ({ disabled, formRef }) => {
  const t = useT()
  const { createDialog } = useDialog()

  const [revenues, setRevenues] = useState([])

  const columns = useMemo(
    () => [
      {
        title: t('month'),
        field: 'month',
        render: (row) => moment(row.month, 'M').format('MMMM')
      },
      {
        title: t('year'),
        field: 'year'
      },
      {
        title: t('value'),
        field: 'value',
        render: (row) => formatMoney(row.value) || '-'
      }
    ],
    [t]
  )

  const onAddClick = useCallback(
    () => createDialog({
      id: 'modal-add-new-revenue',
      Component: NewRevenueModal,
      props: {
        onSubmit (revenue) {
          formRef.current.setFieldValue('additionalInformation.revenues', (old) => [...old, revenue])
        }
      }
    }),
    [createDialog, formRef]
  )

  const onEditClick = useCallback(
    (_, row) => createDialog({
      id: 'modal-edit-revenue',
      Component: NewRevenueModal,
      props: {
        revenue: row,
        onSubmit (revenue) {
          formRef.current.setFieldValue(
            'additionalInformation.revenues',
            (old) => map(old, (item, index) => index === row.tableData.id ? { id: row.id, ...revenue } : item)
          )
        }
      }
    }),
    [createDialog, formRef]
  )

  const onDeleteClick = useCallback(
    (_, row) => createDialog({
      id: 'modal-delete-revenue',
      Component: ConfirmModal,
      props: {
        onConfirm () {
          formRef.current.setFieldValue(
            'additionalInformation.revenues',
            (old) => filter(old, (item, index) => index !== row.tableData.id)
          )
        }
      }
    }),
    [createDialog, formRef]
  )

  return (
    <>
      <DataTable
        options={ { search: false } }
        data={ revenues }
        columns={ columns }
        title={ t('revenue last 12 months') }
        titleProps={ { variant: 'h6' } }
        minimalistToolbar
        addTitle={ t('add new {this}', {
          this: t('revenue', { howMany: 1 }),
          gender: 'male'
        }) }
        onAddClick={ !disabled && onAddClick }
        onEditClick={ !disabled && onEditClick }
        onDeleteClick={ !disabled && onDeleteClick }
      />
      <InputHidden
        name="revenues"
        showError
        onValueChange={ setRevenues }
      />
    </>
  )
}

RevenuesTable.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default RevenuesTable
