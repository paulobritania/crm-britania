import React, {
  useMemo,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import map from 'lodash/map'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { colors } from '@britania-crm/styles'
import fonts from '@britania-crm/styles/fonts'
import DataTable from '@britania-crm/web-components/DataTable'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'

import MicroViewingModal from '../../modals/MicroViewingModal/MicroViewingModal'

const MicroViewingTable = ({
  microViewList,
  onDelete,
  onEdit
}) => {
  const { createDialog } = useDialog()
  const t = useT()

  const columns = useMemo(() => [
    {
      title: 'Menu',
      field: 'menu',
      defaultSort: 'asc'
    },
    {
      title: 'Campos Ocultos',
      field: 'field'
    }
  ], [])

  const tableData = useMemo(() => map(microViewList,
    ({ access, hiddenFields }) => ({
      actions: '',
      menu: access?.name,
      field: [map(hiddenFields, (field) => field.name).join(' - ')],
      access,
      hiddenFields
    })), [microViewList])

  const onDeleteClick = useCallback((event, row) => createDialog({
    id: 'delete-micro-modal',
    Component: ConfirmModal,
    props: {
      onConfirm () {
        onDelete(row)
      }
    }
  }), [createDialog, onDelete])

  const microViewingModal = useCallback(
    (event, row) =>
      createDialog({
        id: 'microview-modal',
        Component: MicroViewingModal,
        props: {
          selectedAccesses: [row.access],
          fieldSelected: row.hiddenFields,
          onSave: onEdit,
          isEdit: true
        }
      }),
    [createDialog, onEdit]
  )

  return (
    <DataTable
      title={ `${ t('micro viewing') }:` }
      titleProps={ {
        variant: 'subtitle1',
        style: { color: colors.grey3, fontWeight: fonts.fontWeight.regular }
      } }
      options={ { search: false } }
      columns={ columns }
      data={ tableData }
      onEditClick={ microViewingModal }
      onDeleteClick={ onDeleteClick }
    />
  )
}

MicroViewingTable.propTypes = {
  microViewList: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
}

MicroViewingTable.defaultProps = {
  onDelete () {},
  onEdit () {}
}

export default MicroViewingTable
