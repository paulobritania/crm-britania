import React, {
  useMemo,
  useCallback,
  useState
} from 'react'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import map from 'lodash/map'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { formatPhone } from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import NewBankReferenceModal from '@britania-crm/web-src/modules/customers/modals/NewBankReferenceModal'

const BankReferencesTable = ({ disabled, formRef }) => {
  const t = useT()
  const { createDialog } = useDialog()

  const [bankReferences, setBankReferences] = useState([])

  const columns = useMemo(
    () => [
      {
        title: t('bank'),
        field: 'name'
      },
      {
        title: t('agency', { howMany: 1 }),
        field: 'agency'
      },
      {
        title: t('account', { howMany: 1 }),
        field: 'account'
      },
      {
        title: t('phone', { howMany: 1 }),
        field: 'phone',
        render: (row) => formatPhone(row.phone) || '-'
      }
    ],
    [t]
  )

  const onAddClick = useCallback(
    () => createDialog({
      id: 'modal-add-new-bank-reference',
      Component: NewBankReferenceModal,
      props: {
        onSubmit (bankReference) {
          formRef.current.setFieldValue('additionalInformation.bankReferences', (old) => [...old, bankReference])
        }
      }
    }),
    [createDialog, formRef]
  )

  const onEditClick = useCallback(
    (_, row) => createDialog({
      id: 'modal-edit-bank-reference',
      Component: NewBankReferenceModal,
      props: {
        bankReference: row,
        onSubmit (bankReference) {
          formRef.current.setFieldValue(
            'additionalInformation.bankReferences',
            (old) => map(old, (item, index) => index === row.tableData.id ? { id: row.id, ...bankReference } : item)
          )
        }
      }
    }),
    [createDialog, formRef]
  )

  const onDeleteClick = useCallback(
    (_, row) => createDialog({
      id: 'modal-delete-bank-reference',
      Component: ConfirmModal,
      props: {
        onConfirm () {
          formRef.current.setFieldValue(
            'additionalInformation.bankReferences',
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
        data={ bankReferences }
        columns={ columns }
        title={ t('bank reference', { howMany: 2 }) }
        titleProps={ { variant: 'h6' } }
        addTitle={ t('add new {this}', {
          this: t('bank reference', { howMany: 1 }),
          gender: 'female'
        }) }
        minimalistToolbar
        onAddClick={ !disabled && onAddClick }
        onEditClick={ !disabled && onEditClick }
        onDeleteClick={ !disabled && onDeleteClick }
      />
      <InputHidden
        name="bankReferences"
        showError
        onValueChange={ setBankReferences }
      />
    </>
  )
}

BankReferencesTable.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default BankReferencesTable
