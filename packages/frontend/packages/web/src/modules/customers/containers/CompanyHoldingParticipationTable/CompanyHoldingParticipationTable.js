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
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import NewCompanyHoldingParticipationModal from '@britania-crm/web-src/modules/customers/modals/NewCompanyHoldingParticipationModal'

const CompanyHoldingParticipationTable = ({ disabled, formRef }) => {
  const t = useT()
  const { createDialog } = useDialog()

  const [participations, setParticipations] = useState([])

  const columns = useMemo(
    () => [
      {
        title: t('company name'),
        field: 'name'
      },
      {
        title: 'UF',
        field: 'state'
      },
      {
        title: t('city', { howMany: 1 }),
        field: 'city'
      },
      {
        title: t('activity branch', { howMany: 1 }),
        field: 'branch'
      },
      {
        title: t('participation', { howMany: 1 }),
        field: 'participationPercent',
        render: (row) => `${ row.participationPercent }%`
      }
    ],
    [t]
  )

  const onAddClick = useCallback(
    () => createDialog({
      id: 'modal-add-new-participation',
      Component: NewCompanyHoldingParticipationModal,
      props: {
        onSubmit (participation) {
          formRef.current.setFieldValue('additionalInformation.participationsCompany', (old) => [...old, participation])
        }
      }
    }),
    [createDialog, formRef]
  )

  const onEditClick = useCallback(
    (_, row) => createDialog({
      id: 'modal-edit-participation',
      Component: NewCompanyHoldingParticipationModal,
      props: {
        participation: row,
        onSubmit (participation) {
          formRef.current.setFieldValue(
            'additionalInformation.participationsCompany',
            (old) => map(old, (item, index) => index === row.tableData.id ? { id: row.id, ...participation } : item)
          )
        }
      }
    }),
    [createDialog, formRef]
  )

  const onDeleteClick = useCallback(
    (_, row) => createDialog({
      id: 'modal-delete-participation',
      Component: ConfirmModal,
      props: {
        onConfirm () {
          formRef.current.setFieldValue(
            'additionalInformation.participationsCompany',
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
        data={ participations }
        columns={ columns }
        title={ t('companies holding participation') }
        titleProps={ { variant: 'h6' } }
        minimalistToolbar
        addTitle={ t('add new {this}', {
          this: t('participation', { howMany: 1 }),
          gender: 'female'
        }) }
        onAddClick={ !disabled && onAddClick }
        onEditClick={ !disabled && onEditClick }
        onDeleteClick={ !disabled && onDeleteClick }
      />
      {formRef && (
        <InputHidden
          name="participationsCompany"
          showError
          onValueChange={ setParticipations }
        />
      )}
    </>
  )
}

CompanyHoldingParticipationTable.propTypes = {
  formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default CompanyHoldingParticipationTable
