import React from 'react'

import find from 'lodash/find'

import { treeTypes } from '@britania-crm/constants/workflow.constants'
import I18n from '@britania-crm/i18n'

import CardHoc from '../CardHoc/CardHoc'
import ConditionCard from './ConditionCard'
import ResponseCard from './ResponseCard'
import TaskCard from './TaskCard'

export const formatWorkflowCards = ({ node }, {
  readOnly, deleteNode, onAddOrEditTask
}) => {
  const Task = <TaskCard node={ node } onAddOrEditTask={ onAddOrEditTask } deleteNode={ deleteNode } readOnly={ readOnly } />

  const Response = <ResponseCard node={ node } />

  const Condition = <ConditionCard node={ node } />

  const renders = [
    {
      type: treeTypes.TASK.type,
      component: Task,
      title: <I18n params={ { howMany: 1 } } >task</I18n>
    },
    {
      type: treeTypes.CONDITION.type,
      component: Condition,
      title: <I18n>conditional</I18n>
    },
    {
      type: treeTypes.RESPONSE.type,
      component: Response,
      title: <I18n params={ { requiresJustification: node.requiresJustification } }>response</I18n>
    }
  ]

  return {
    title () {
      const itemToRender = find(renders, (item) => item.type === node.type?.type)

      return CardHoc({
        component: itemToRender.component,
        type: node.type,
        title: itemToRender.title
      })
    },
    className: 'tree-view-card',
    listIndex: 0,
    lowerSiblingCounts: []
  }
}
