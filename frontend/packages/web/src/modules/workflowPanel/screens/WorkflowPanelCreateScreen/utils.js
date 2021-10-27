
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import filter from 'lodash/filter'
import findIndex from 'lodash/findIndex'
import isString from 'lodash/isString'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import pick from 'lodash/pick'

import { treeTypes } from '@britania-crm/constants/workflow.constants'

export const formatTasks = (itemsToFormat) => map(itemsToFormat, (task) => {
  const orderedConditions = orderBy(task.conditions, 'order', 'asc')

  const formattedConditions = map(orderedConditions, (condition) => ({
    ...condition,
    id: uuidv4(),
    fieldId: condition?.field?.id,
    accessId: condition?.field?.access?.id,
    type: treeTypes.CONDITION
  }))

  const orderedResponses = orderBy(task.responses, 'order', 'asc')

  const formattedResponses = map(orderedResponses, (response) => ({
    ...response,
    id: uuidv4(),
    type: treeTypes.RESPONSE
  }))

  const children = [
    ...formattedConditions,
    ...formattedResponses
  ]

  return {
    ...task,
    id: uuidv4(),
    children,
    type: treeTypes.TASK
  }
})

export const formatRequest = (form, tasks) => ({
  ...pick(form, ['title', 'description']),
  dateStart: moment(form.period.from).toISOString(),
  dateEnd: moment(form.period.to).toISOString(),
  typeId: Number(form.typeId),
  tasks: map(tasks, (item, index) => {
    const conditions = filter(item.children, (children) =>
      children.type?.type === treeTypes.CONDITION.type
    )

    const responses = filter(item.children, (children) =>
      children.type?.type === treeTypes.RESPONSE.type
    )

    return {
      ...pick(item, ['deadline', 'userId', 'userAlternateId', 'title']),
      order: index + 1,
      profileId: item.profile?.id,
      userId: item.userId ? Number(item.userId) : null,
      userAlternateId: item.userAlternateId ? Number(item.userAlternateId) : null,
      conditions: map(conditions, (condition, index) => ({
        ...pick(condition, ['fieldId', 'title', 'comparisonSymbol', 'comparisonValue']),
        order: index + 1
      })),
      responses: map(responses, (response, index) => ({
        ...pick(response, ['title', 'requiresJustification', 'finishWorkflowWithError', 'finishWorkflowSuccessfully']),
        order: index + 1,
        nextTaskOrder: isString(response.nextTaskOrder) ? (findIndex(tasks, (task) => task.id === response.nextTaskOrder) + 1) : response.nextTaskOrder
      }))
    }
  })
})
