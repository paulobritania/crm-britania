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
import NewCommercialReferenceModal from '@britania-crm/web-src/modules/customers/modals/NewCommercialReferenceModal'

const CommercialReferencesTable = ({ disabled, formRef }) => {
  const t = useT()
  const { createDialog } = useDialog()

  const [commercialReferences, setCommercialReferences] = useState([])

  const columns = useMemo(
    () => [
      {
        title: t('name', { howMany: 1 }),
        field: 'name'
      },
      {
        title: t('phone', { howMany: 1 }),
        field: 'phone',
        render: (row) => formatPhone(row?.phone) || '-'
      }
    ],
    [t]
  )

  const onAddClick = useCallback(
    () => createDialog({
      id: 'modal-add-new-commercial-reference',
      Component: NewCommercialReferenceModal,
      props: {
        onSubmit (commercialReference) {
          formRef.current.setFieldValue('additionalInformation.commercialReferences', (old) => [...old, commercialReference])
        }
      }
    }),
    [createDialog, formRef]
  )

  const onEditClick = useCallback(
    (_, row) => createDialog({
      id: 'modal-edit-commercial-reference',
      Component: NewCommercialReferenceModal,
      props: {
        commercialReference: row,
        onSubmit (commercialReference) {
          formRef.current.setFieldValue(
            'additionalInformation.commercialReferences',
            (old) => map(old, (item, index) => index === row.tableData.id ? { id: row.id, ...commercialReference } : item)
          )
        }
      }
    }),
    [createDialog, formRef]
  )

  const onDeleteClick = useCallback(
    (_, row) => createDialog({
      id: 'modal-delete-commercial-reference',
      Component: ConfirmModal,
      props: {
        onConfirm () {
          formRef.current.setFieldValue(
            'additionalInformation.commercialReferences',
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
        data={ commercialReferences }
        columns={ columns }
        title={ t('commercial reference', { howMany: 2 }) }
        titleProps={ { variant: 'h6' } }
        addTitle={ t('add new {this}', {
          this: t('commercial reference', { howMany: 1 }),
          gender: 'female'
        }) }
        minimalistToolbar
        onAddClick={ !disabled && onAddClick }
        onEditClick={ !disabled && onEditClick }
        onDeleteClick={ !disabled && onDeleteClick }
      />
      <InputHidden
        name="commercialReferences"
        showError
        onValueChange={ setCommercialReferences }
      />
    </>
  )
}

CommercialReferencesTable.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default CommercialReferencesTable
