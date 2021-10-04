import React, {
  useCallback,
  useMemo,
  useState
} from 'react'
import { useDispatch } from 'react-redux'

import doDownloadFile from 'js-file-download'
import moment from 'moment/moment'
import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import map from 'lodash/map'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { VpcActions } from '@britania-crm/stores/vpc'
import { formatBackDateToFriendlyFormat } from '@britania-crm/utils/date'
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'

import formFileModal from '../../../../modals/formFileModal'
import { Container } from './styles'

const Attachment = ({ disabled, formRef }) => {
  const t = useT()
  const { createDialog } = useDialog()
  const dispatch = useCallback(useDispatch(), [])

  const [attachments, setAttachments] = useState([])
  const [loader, setLoader] = useState(false)

  const columns = useMemo(() => [
    {
      title: t('description', { howMany: 1 }),
      field: 'description',
      sorting: false
    },
    {
      title: t('date'),
      field: 'created_at',
      sorting: false,
      render: (row) => formatBackDateToFriendlyFormat(row.created_at || moment().format())
    }
  ], [t])

  const onAddClick = useCallback(
    () => {
      createDialog({
        id: 'createFileModal',
        Component: formFileModal,
        props: {
          attachments,
          mode: 'create',
          onSave (values) {
            formRef.current.setFieldValue('attachments', (old) => [...old, values])
          }
        }
      })
    }, [createDialog, attachments, formRef])

  const onEditClick = useCallback(
    (event, row) => {
      createDialog({
        id: 'editFileModal',
        Component: formFileModal,
        props: {
          row,
          mode: 'edit',
          onEdit (values) {
            formRef.current.setFieldValue('attachments', (old) =>
              map(old, (item) => {
                if (item.tableData?.id === row?.tableData?.id) {
                  return {
                    ...values,
                    ...row,
                    file: values.file,
                    description: values.description,
                    created_at: moment().format('L'),
                    tableData: item.tableData
                  }
                }
                return item
              })
            )
          }
        }
      })
    }, [createDialog, formRef])

  const onViewFileClick = useCallback(
    (event, row) => {
      createDialog({
        id: 'viewFileModal',
        Component: formFileModal,
        props: { row, mode: 'view' }
      })
    }, [createDialog])

  const onDeleteClick = useCallback(
    (event, row) => {
      formRef.current.setFieldValue('attachments', (old) => filter(old, (item) => item.tableData?.id !== row.tableData?.id))
    },
    [formRef]
  )

  const onDownloadClick = useCallback(
    (event, row) => {
      setLoader(true)
      const path = row?.file?.path || row?.path
      const filename = row?.file?.filename || row?.file?.name
      if (path) {
        dispatch(VpcActions.downloadFileVpc(path, filename, setLoader))
      } else {
        doDownloadFile(row.file, filename)
        setLoader(false)
      }
    },
    [dispatch]
  )

  return (
    <Container >
      <DataTable
        data={ attachments }
        columns={ columns }
        addTitle={ t('add new {this}', { gender: 'male', this: t('archive', { howMany: 1 }) }) }
        onAddClick={ !disabled && onAddClick }
        onEditClick={ !disabled && onEditClick }
        onDeleteClick={ !disabled && onDeleteClick }
        onDownloadClick={ onDownloadClick }
        onRowClick={ onViewFileClick }
        options={ { search: false } }
        loading={ loader }
      />
      <InputHidden name="attachments" onValueChange={ setAttachments } showError/>
    </Container>
  )
}

Attachment.propTypes = {
  disabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired
}

export default Attachment
