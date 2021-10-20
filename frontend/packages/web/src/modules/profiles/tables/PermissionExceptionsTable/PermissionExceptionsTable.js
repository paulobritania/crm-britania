import React, {
  useMemo,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import { map } from 'lodash-es'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { colors } from '@britania-crm/styles'
import fonts from '@britania-crm/styles/fonts'
import DataTable from '@britania-crm/web-components/DataTable'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'

import PermissionExceptionsModal from '../../modals/PermissionExceptionsModal/PermissionExceptionsModal'

const PermissionExceptionsTable = ({
  exceptionsList, onDelete, onEdit
}) => {
  const t = useT()
  const { createDialog } = useDialog()
  const columns = useMemo(() => [
    {
      title: 'Menu',
      field: 'menu',
      defaultSort: 'asc'
    },
    {
      title: 'Exceção',
      field: 'hideFields'
    }
  ], [])

  const data = useMemo(() => map(exceptionsList, ({ access, permission }) => ({
    accessId: access.id,
    menu: access?.name,
    hideFields: map(permission, (item) => (item.name)).join(' - '),
    access,
    permission
  })), [exceptionsList])

  const onDeleteClick = useCallback((event, row) => createDialog({
    id: 'delete-exception-modal',
    Component: ConfirmModal,
    props: {
      onConfirm () {
        onDelete(row)
      }
    }
  }), [createDialog, onDelete])

  const permissionModal = useCallback(
    (event, row) =>
      createDialog({
        id: 'permission-modal',
        Component: PermissionExceptionsModal,
        props: {
          onSave: onEdit,
          permissions: row.permission,
          access: [row.access],
          isEdit: true
        }
      }),
    [createDialog, onEdit]
  )

  return (
    <DataTable
      title={ `${ t('permission exception') }:` }
      titleProps={ {
        variant: 'subtitle1',
        style: { color: colors.grey3, fontWeight: fonts.fontWeight.regular }
      } }
      options={ { search: false } }
      columns={ columns }
      data={ data }
      onEditClick={ permissionModal }
      onDeleteClick={ onDeleteClick }
    />
  )
}

PermissionExceptionsTable.propTypes = {
  exceptionsList: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
}

PermissionExceptionsTable.defaultProps = {
  onDelete () {},
  onEdit () {}
}

export default PermissionExceptionsTable
