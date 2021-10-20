import React, {
  useMemo,
  useCallback,
  useState
} from 'react'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import map from 'lodash/map'
import size from 'lodash/size'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { formatMoney } from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import NewCounterPropertyModal from '@britania-crm/web-src/modules/customers/modals/NewCounterPropertyModal'

const CounterPropertiesTable = ({ disabled, formRef }) => {
  const t = useT()
  const { createDialog } = useDialog()

  const [counterProperties, setCounterProperties] = useState([])

  const disableAdd = useMemo(
    () => disabled || size(counterProperties) >= 3,
    [counterProperties, disabled]
  )

  const columns = useMemo(
    () => [
      {
        title: t('description'),
        field: 'description'
      },
      {
        title: t('localization', { howMany: 1 }),
        field: 'localization'
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
      id: 'modal-add-new-counter-property',
      Component: NewCounterPropertyModal,
      props: {
        onSubmit (counterProperty) {
          formRef.current.setFieldValue('additionalInformation.counter.values', (old) => [...old, counterProperty])
        }
      }
    }),
    [createDialog, formRef]
  )

  const onEditClick = useCallback(
    (_, row) => createDialog({
      id: 'modal-edit-counter-property',
      Component: NewCounterPropertyModal,
      props: {
        counterProperty: row,
        onSubmit (counterProperty) {
          formRef.current.setFieldValue(
            'additionalInformation.counter.values',
            (old) => map(old, (item, index) => index === row.tableData.id ? { id: row.id, ...counterProperty } : item)
          )
        }
      }
    }),
    [createDialog, formRef]
  )

  const onDeleteClick = useCallback(
    (_, row) => createDialog({
      id: 'modal-delete-counter-property',
      Component: ConfirmModal,
      props: {
        onConfirm () {
          formRef.current.setFieldValue(
            'additionalInformation.counter.values',
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
        data={ counterProperties }
        columns={ columns }
        title={ t('goods list') }
        titleProps={ { variant: 'h6' } }
        minimalistToolbar
        addTitle={ t('add new {this}', {
          this: t('goods list'),
          gender: 'female'
        }) }
        onAddClick={ !disableAdd && onAddClick }
        onEditClick={ !disabled && onEditClick }
        onDeleteClick={ !disabled && onDeleteClick }
      />
      <InputHidden
        name="values"
        showError
        onValueChange={ setCounterProperties }
      />
    </>
  )
}

CounterPropertiesTable.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default CounterPropertiesTable
