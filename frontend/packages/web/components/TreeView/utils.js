import { v4 as uuidv4 } from 'uuid'

import { treeTypes } from '@britania-crm/constants/workflow.constants'

export const getEmptyResponse = () => ({
  id: uuidv4(),
  type: treeTypes.RESPONSE,
  requiresJustification: false,
  title: '',
  nextTaskOrder: null,
  finishWorkflowWithError: false,
  finishWorkflowSuccessfully: false
})

export const getEmptyCondition = () => ({
  id: uuidv4(),
  title: '',
  type: treeTypes.CONDITION,
  menu: '',
  fieldId: null,
  addressId: null,
  comparisonSymbol: '',
  comparisonValue: ''
})

export const getEmptyTask = () => ({
  id: uuidv4(),
  type: treeTypes.TASK,
  title: '',
  children: [],
  profile: '',
  user: '',
  userId: '',
  userAlternateId: '',
  userAlternate: '',
  deadline: ''
})
