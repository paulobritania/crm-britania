import React, {
  useMemo,
  useCallback
} from 'react'
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag'

import PropTypes from 'prop-types'

import findIndex from 'lodash/findIndex'

import { MSG006 } from '@britania-crm/constants/feedbackMessages.constants'
import { treeTypes } from '@britania-crm/constants/workflow.constants'
import { useDialog } from '@britania-crm/dialog'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'

import Buttons from './Buttons'
import { formatResponseAndConditionCards } from './ResponseAndConditionCards'
import { Container } from './styles'
import {
  getEmptyResponse,
  getEmptyCondition,
  getEmptyTask
} from './utils'
import { formatWorkflowCards } from './WorkflowCards'

const TreeView = ({
  items,
  onChange,
  readOnly,
  fields,
  isTaskView,
  id,
  allTasks,
  task,
  onAddOrEditTask,
  confirmDelete
}) => {
  const rowHeight = ({ node }) => isTaskView ? node.type?.taskRowHeight : node.type?.conditionslAndResponseRowHeight
  const canDrag = ({ parentNode, node }) => !readOnly && parentNode === null && node.type.type === treeTypes.TASK.type
  const canDrop = ({ nextParent }) => nextParent === null

  const onDragStateChanged = ({ draggedNode }) => {
    if (draggedNode) {
      draggedNode.expanded = false
    }
  }

  const onMoveNode = ({ treeData }) => {
    if (treeData) {
      onChange(toggleExpandedForAll({ treeData, expanded: false }))
    }
  }

  const { createDialog } = useDialog()

  const onPropChange = useCallback((field, index, eventValue = 'value') => (event) => {
    const value = event?.target ? event.target[eventValue] : event

    onChange((prevState) => {
      const tmp = [...prevState]

      tmp[index][field] = value

      return tmp
    })
  }, [onChange])

  const onAddNewConditionOrResponse = useCallback((type) => () => {
    onChange((prevState) => {
      const tmp = [
        ...prevState,
        type === 'response' ? getEmptyResponse() : getEmptyCondition()
      ]

      return tmp
    })
  }, [onChange])

  const onDeleteNode = useCallback((nodeId) => {
    const index = findIndex(items, (item) => item.id === nodeId)
    const tmp = [...items]

    tmp.splice(index, 1)

    onChange(tmp)
  }, [items, onChange])

  const handleConfimDelete = useCallback(
    (nodeId) => {
      createDialog({
        id: 'confirm-delete',
        Component: ConfirmModal,
        props: {
          onConfirm: () => onDeleteNode(nodeId),
          text: MSG006
        }
      })
    },
    [createDialog, onDeleteNode]
  )

  const deleteNode = useCallback((nodeId) => () => {
    if (confirmDelete) handleConfimDelete(nodeId)
    else onDeleteNode(nodeId)
  }, [confirmDelete, handleConfimDelete, onDeleteNode])

  const addTask = useCallback(() => {
    const newTask = getEmptyTask()

    onAddOrEditTask(newTask)
  }, [onAddOrEditTask])

  const nodeProps = useMemo(() => {
    if (isTaskView) {
      return (props) => formatWorkflowCards(props, {
        readOnly, deleteNode, onAddOrEditTask
      })
    }

    return (props) => formatResponseAndConditionCards(
      props,
      {
        fields,
        onPropChange,
        readOnly,
        items,
        deleteNode,
        allTasks,
        task
      }
    )
  }, [isTaskView, readOnly, deleteNode, onAddOrEditTask, fields, onPropChange, items, allTasks, task])

  return (
    <Container id={ id }>
      <SortableTree
        treeData={ items }
        onChange={ onChange }
        canDrag={ canDrag }
        canDrop={ canDrop }
        generateNodeProps={ nodeProps }
        theme={ FileExplorerTheme }
        rowHeight={ rowHeight }
        onMoveNode={ onMoveNode }
        onDragStateChanged={ onDragStateChanged }
        isVirtualized={ isTaskView }
      />
      {!readOnly &&
        <Buttons
          id={ id }
          isTaskView={ isTaskView }
          onAddNewConditionOrResponse={ onAddNewConditionOrResponse }
          onAddTask={ addTask }
          amountOfTasks={ items.length }
        />
      }
    </Container>
  )
}

TreeView.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  fields: PropTypes.array,
  isTaskView: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onAddOrEditTask: PropTypes.func,
  task: PropTypes.object,
  allTasks: PropTypes.array,
  confirmDelete: PropTypes.bool
}

TreeView.defaultProps = {
  readOnly: false,
  fields: [],
  taskId: null,
  onAddOrEditTask () {},
  isTaskView: false,
  task: {},
  allTasks: [],
  confirmDelete: true
}

export default TreeView
