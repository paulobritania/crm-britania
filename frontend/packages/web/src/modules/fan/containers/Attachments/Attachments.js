import React, {
  useCallback,
  useMemo,
  useState
} from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'

import Grid from '@material-ui/core/Grid'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { FanActions } from '@britania-crm/stores/fan'
import { formatBackDateToFriendlyFormat } from '@britania-crm/utils/date'
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'

import FileModal from '../../modals/FileModal'

const Attachments = ({
  isDisabled, formRef, idFan
}) => {
  const t = useT()
  const { createDialog } = useDialog()
  const dispatch = useCallback(useDispatch(), [])

  const [attachments, setAttachments] = useState([])

  const version = useMemo(
    () => {
      if (!isEmpty(attachments)) {
        return last(attachments).version
      }
      return 0
    }
    , [attachments])

  const columns = useMemo(() => [
    {
      title: t('filename', { howMany: 1 }),
      field: 'filename',
      defaultSort: 'asc',
      render (row) {
        let fileName
        if (!isEmpty(row.file)) {
          fileName = row.file.filename.split('.')
          return `${ fileName[0] } (${ row.version }).${ fileName[1] }`
        }
        fileName = row.filename.split('.')
        return `${ fileName[0] } (${ row.version }).${ fileName[1] }`
      }
    },
    {
      title: t('description', { howMany: 1 }),
      field: 'description',
      defaultSort: 'asc'
    },
    {
      title: t('date'),
      field: 'created_at',
      defaultSort: 'asc',
      render: (row) => formatBackDateToFriendlyFormat(row.created_at || row.file.created_at)
    }
  ], [t])

  const onAddClick = useCallback(
    () => {
      createDialog({
        id: 'createFileModal',
        Component: FileModal,
        props: {
          mode: 'create',
          idFan,
          version,
          onSave (values) {
            formRef.current.setFieldValue('fan.attachments', (old) => [...old, { ...values, fileId: values.id }])
          }
        }
      })
    }, [createDialog, formRef, idFan, version])

  const onViewFileClick = useCallback(
    (event, row) => {
      createDialog({
        id: 'viewFileModal',
        Component: FileModal,
        props: {
          row, idFan, version: row.version, mode: 'view'
        }
      })
    }, [createDialog, idFan])

  const onDeleteClick = useCallback(
    (event, row) => {
      dispatch(FanActions.deleteFileFan(
        row.id,
        () => formRef.current.setFieldValue('fan.attachments', (old) => filter(old, ({ tableData }) => tableData?.id !== row?.tableData?.id))
      ))
    },
    [dispatch, formRef]
  )

  const onDownloadClick = useCallback(
    (event, row) => {
      dispatch(FanActions.downloadFileFan(row?.path, row.filename))
    },
    [dispatch]
  )

  return (
    <Grid container spacing={ 1 }>
      <DataTable
        data={ attachments }
        columns={ columns }
        addTitle={ t('add new {this}', { gender: 'male', this: t('attachments', { howMany: 1 }) }) }
        onAddClick={ !isDisabled && onAddClick }
        onDeleteClick={ !isDisabled && onDeleteClick }
        onDownloadClick={ onDownloadClick }
        onRowClick={ onViewFileClick }
        options={ { search: false } }
      />
      <InputHidden name="attachments" onValueChange={ setAttachments } showError/>
    </Grid>
  )
}

Attachments.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired,
  idFan: PropTypes.number.isRequired
}

export default Attachments
