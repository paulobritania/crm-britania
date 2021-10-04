import React from 'react'

import colors from '@britania-crm/styles/colors'
import {
  ConditionIcon,
  ResponseIcon,
  TaskIcon
} from '@britania-crm/web-components/Icons'

export const treeTypes = {
  TASK: {
    type: 1,
    color: colors.blue.base,
    taskRowHeight: 80,
    conditionslAndResponseRowHeight: 80,
    icon: <TaskIcon color={ colors.blue.base } />
  },
  CONDITION: {
    type: 2,
    color: colors.yellow.light,
    taskRowHeight: 160,
    conditionslAndResponseRowHeight: 80,
    icon: <ConditionIcon color={ colors.yellow.light } />
  },
  RESPONSE: {
    type: 3,
    color: colors.lightBlue,
    taskRowHeight: 80,
    conditionslAndResponseRowHeight: 150,
    icon: <ResponseIcon color={ colors.info.main } />
  }
}

export const errorTypes = {
  WORKFLOW_NOT_FOUND: 'Workflow não encontrado',
  WORKFLOW_ALREADY_INACTIVE: 'O workflow já está inativo',
  WORKFLOW_INVALID_TYPE: 'Tipo de workflow inválido',
  WORKFLOW_INVALID_NEXT_TASK_ORDER: 'Alguma tarefa é inválida',
  WORKFLOW_INVALID_ORDERS: 'As tarefas ou Respostas não possuem uma ordem correta',
  WORKFLOW_INVALID_TITLES: 'Títulos das Tarefas não devem ser iguais',
  WORKFLOW_INVALID_SHELF_LIFE: 'A validade informada já esta em uso, e não é possível ter mais de um workflow na mesma vigência.'
}
