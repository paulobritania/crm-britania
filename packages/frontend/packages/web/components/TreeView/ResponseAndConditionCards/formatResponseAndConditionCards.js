import React from 'react'

import find from 'lodash/find'

import { treeTypes } from '@britania-crm/constants/workflow.constants'
import I18n from '@britania-crm/i18n'

import CardHoc from '../CardHoc/CardHoc'
import ConditionCard from './ConditionCard'
import ResponseCard from './ResponseCard'

export const formatResponseAndConditionCards = (
  { node, treeIndex },
  {
    onPropChange,
    readOnly,
    items,
    deleteNode,
    allTasks,
    task
  }
) => {
  const Response = (
    <ResponseCard
      onPropChange={ onPropChange }
      treeIndex={ treeIndex }
      readOnly={ readOnly }
      items={ items }
      deleteNode={ deleteNode }
      allTasks={ allTasks }
      task={ task }
    />
  )

  const Condition = (
    <ConditionCard
      onPropChange={ onPropChange }
      treeIndex={ treeIndex }
      readOnly={ readOnly }
      items={ items }
      deleteNode={ deleteNode }
    />
  )

  const renders = [
    {
      type: treeTypes.CONDITION.type,
      component: Condition,
      title: <I18n>conditional</I18n>
    },
    {
      type: treeTypes.RESPONSE.type,
      component: Response,
      title: <I18n params={ { requiresJustification: items[treeIndex]?.requiresJustification } }>response</I18n>
    }
  ]

  return {
    title () {
      const itemToRender = find(renders, (item) => item.type === node.type?.type)

      return CardHoc({
        component: itemToRender.component,
        type: node.type,
        fullWidth: true
      })
    },
    className: 'tree-view-card',
    listIndex: 0,
    lowerSiblingCounts: []
  }
}
