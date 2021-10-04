import React, {
  useCallback,
  useMemo,
  useState
} from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { RepresentativeActions } from '@britania-crm/stores/representative'
import { formatBackDateToFriendlyFormat } from '@britania-crm/utils/date'
import DataTable from '@britania-crm/web-components/DataTable'
import InputHidden from '@britania-crm/web-components/InputHidden'
import { CircularLoader } from '@britania-crm/web-components/Loader'

import formFileModal from '../../modals/formFileModal/FormFileModal'
import useStyles from '../styles'

const Documentation = ({ disabled, formRef }) => {
  const t = useT()
  const classes = useStyles()
  const { createDialog } = useDialog()
  const dispatch = useCallback(useDispatch(), [])

  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = useMemo(() => [
    {
      title: t('name', { howMany: 1 }),
      field: 'name',
      sorting: false
    },
    {
      title: t('observation', { howMany: 1 }),
      field: 'observation',
      sorting: false
    },
    {
      title: t('date'),
      field: 'created_at',
      sorting: false,
      render: (row) => formatBackDateToFriendlyFormat(row.file?.created_at || row.created_at)
    }
  ], [t])

  const onAddClick = useCallback(
    () => {
      createDialog({
        id: 'createFileModal',
        Component: formFileModal,
        props: {
          mode: 'create',
          onSave (values) {
            formRef.current.setFieldValue('documents', (old) => [...old, values])
          }
        }
      })
    }, [createDialog, formRef])

  const onEditClick = useCallback(
    (event, row) => {
      createDialog({
        id: 'editFileModal',
        Component: formFileModal,
        props: {
          row,
          mode: 'edit',
          onEdit (values) {
            formRef.current.setFieldValue('documents', (old) =>
              map(old, (item) => {
                if (item.tableData?.id === row?.tableData?.id) {
                  return {
                    ...values,
                    id: row.id
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
      dispatch(RepresentativeActions.deleteFileRepresentative(
        row.id,
        () => formRef.current.setFieldValue('documents', (old) => filter(old, ({ tableData }) => tableData?.id !== row?.tableData?.id))
      ))
    },
    [dispatch, formRef]
  )

  const onDownloadClick = useCallback(
    (event, row) => {
      setLoading(true)
      dispatch(RepresentativeActions.downloadFileRepresentative(row?.file?.path, row?.file?.filename, setLoading))
    },
    [dispatch]
  )

  return (
    <Grid container spacing={ 1 } className={ classes.containerMain } >
      {loading && <Grid container justify="center"><CircularLoader /></Grid> }
      <DataTable
        data={ documents }
        columns={ columns }
        addTitle={ t('add new {this}', { gender: 'male', this: t('archive', { howMany: 1 }) }) }
        onAddClick={ !disabled && onAddClick }
        onEditClick={ !disabled && onEditClick }
        onDeleteClick={ !disabled && onDeleteClick }
        onDownloadClick={ onDownloadClick }
        onRowClick={ onViewFileClick }
        options={ { search: false } }
      />
      <InputHidden name="documents" onValueChange={ setDocuments } showError/>
    </Grid>
  )
}

Documentation.propTypes = {
  disabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired
}

export default Documentation
