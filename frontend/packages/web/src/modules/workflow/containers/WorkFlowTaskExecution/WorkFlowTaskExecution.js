import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  memo
} from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'
import * as Yup from 'yup'

import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'
import toNumber from 'lodash/toNumber'

import justificationValidator from '@britania-crm/forms/validators/justification.validator'
import { useT } from '@britania-crm/i18n'
import { WorkflowActions } from '@britania-crm/stores/workflow'
import DataTable from '@britania-crm/web-components/DataTable'
import RadioGroup from '@britania-crm/web-components/RadioGroup'

import JustificationEditComponent from './JustificationEditComponent'

const WorkFlowTaskExecution = (props) => {
  const {
    taskInProgress,
    baseUrl,
    isReadOnly
  } = props

  const t = useT()
  const dispatch = useDispatch()

  const tableRef = useRef(null)
  const mounted = useRef(false)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = useMemo(
    () => [
      {
        title: t('workflow'),
        field: 'version',
        editable: 'never',
        width: 100
      },
      {
        title: t('task', { howMany: 1 }),
        field: 'task',
        editable: 'never',
        width: 200
      },
      {
        title: t('response', { requiresJustification: false }),
        field: 'workflowTaskResponseId',
        editable: 'always',
        width: 300,
        render: (row) => find(row.responses, { id: row.workflowTaskResponseId })?.title || '-',
        initialEditValue: '',
        editComponent: ({
          // eslint-disable-next-line react/prop-types
          value, onChange, rowData: { responses }
        }) => (
          <RadioGroup
            detached
            name="workflowTaskResponseId"
            value={ value }
            onChange={ (e) => onChange(toNumber(e.target.value)) }
            options={ responses }
            valueKey="title"
            disabled={ isReadOnly }
          />
        ),
        validate: (row) => !!row.workflowTaskResponseId
      },
      {
        title: t('justification'),
        field: 'justification',
        editable: 'always',
        initialEditValue: null,
        isReadOnly,
        editComponent: JustificationEditComponent,
        validate (row) {
          const currentResponse = find(row.responses, { id: row.workflowTaskResponseId })
          if (!currentResponse?.requiresJustification) {
            return true
          }

          try {
            const justificationSchema = justificationValidator({ t })(Yup.string().nullable())
            justificationSchema.validateSync(row.justification, { abortEarly: false })
            return true
          } catch (error) {
            return {
              isValid: false,
              helperText: last(error.errors)
            }
          }
        }
      }
    ],
    [isReadOnly, t]
  )

  const options = useMemo(
    () => ({
      search: false,
      sorting: false,
      paging: false,
      resetOnUpdate: false,
      disableCancelEdit: true
    }),
    []
  )

  const editableOptions = useMemo(
    () => isEmpty(data) ? {} : ({
      onRowUpdate: (row) => new Promise((resolve, reject) => {
        const payload = {
          workflowTaskResponseId: row.workflowTaskResponseId,
          justification: row.justification ? row.justification : null
        }
        setLoading(true)
        dispatch(WorkflowActions.answerWorkflow(
          baseUrl,
          payload,
          () => {
            if (mounted.current) {
              setData([row])
              setLoading(false)
            }
            resolve()
          },
          (error) => {
            if (mounted.current) {
              setLoading(false)
            }
            reject(error)
          }
        ))
      })
    }),
    [baseUrl, data, dispatch]
  )

  useEffect(
    // mount material-table in row edit mode
    () => {
      if (!isEmpty(data) && tableRef && tableRef.current) {
        const rowData = tableRef.current.props.data[0]
        tableRef.current.dataManager.changeRowEditing(rowData, 'update')
        tableRef.current.setState(tableRef.current.dataManager.getRenderState())
      }
    },
    [tableRef, data]
  )

  useEffect(
    () => {
      setData(isEmpty(taskInProgress) ? [] : [taskInProgress])
    },
    [taskInProgress]
  )

  useEffect(
    () => {
      mounted.current = true
      return () => {
        mounted.current = false
      }
    },
    []
  )

  return !isEmpty(data) && (
    <DataTable
      ref={ tableRef }
      options={ options }
      data={ data }
      columns={ columns }
      loading={ loading }
      editable={ editableOptions }
      minimalistToolbar
    />
  )
}

WorkFlowTaskExecution.propTypes = {
  taskInProgress: PropTypes.object,
  baseUrl: PropTypes.string,
  isReadOnly: PropTypes.bool
}

WorkFlowTaskExecution.defaultProps = {
  taskInProgress: {},
  baseUrl: null,
  isReadOnly: false
}

export default memo(WorkFlowTaskExecution)
