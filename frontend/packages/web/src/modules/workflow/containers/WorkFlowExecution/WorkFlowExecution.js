import React, {
  memo,
  useCallback
} from 'react'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import { useDialog } from '@britania-crm/dialog'
import I18n from '@britania-crm/i18n'
import CardRounded from '@britania-crm/web-components/CardRounded'

import WorkFlowHistoryModal from '../../modals/WorkFlowHistoryModal/WorkFlowHistoryModal'
import WorkFlowProgress from '../WorkFlowProgress/WorkFlowProgress'
import WorkFlowTaskExecution from '../WorkFlowTaskExecution/WorkFlowTaskExecution'
import {
  Title,
  Button
} from './styles'

const WorkFlowExecution = (props) => {
  const {
    taskInProgress,
    workflowInProgress,
    baseUrl,
    fieldDescription
  } = props
  const isReadOnly = taskInProgress?.isReadOnly

  const { createDialog } = useDialog()

  const handleOpenWorkflowHistoryModal = useCallback(
    () => createDialog({
      id: 'WorkFlowModal',
      Component: WorkFlowHistoryModal,
      props: { baseUrl }
    }),
    [createDialog, baseUrl]
  )

  return (
    <CardRounded>
      <I18n as={ Title }>
          workflow execution
      </I18n>

      {!isEmpty(workflowInProgress) && (
        <WorkFlowProgress
          workflowInProgress={ workflowInProgress }
          fieldDescription={ fieldDescription }
        />
      )}

      {!isEmpty(taskInProgress) && (
        <WorkFlowTaskExecution baseUrl={ baseUrl } taskInProgress={ taskInProgress } isReadOnly={ isReadOnly } />
      )}

      <I18n
        as={ Button }
        onClick={ handleOpenWorkflowHistoryModal }
        color="default"
        variant="outlined"
        style={ { marginTop: 10 } }
      >
          workflow history
      </I18n>
    </CardRounded>
  )
}

WorkFlowExecution.propTypes = {
  taskInProgress: PropTypes.object,
  workflowInProgress: PropTypes.object,
  baseUrl: PropTypes.string,
  fieldDescription: PropTypes.string,
  isReadOnly: PropTypes.bool
}

WorkFlowExecution.defaultProps = {
  taskInProgress: {},
  workflowInProgress: {},
  baseUrl: null,
  fieldDescription: null,
  isReadOnly: true
}

export default memo(WorkFlowExecution)
