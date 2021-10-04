import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  getAllWorkflows: ['params'],
  setAllWorkflowsSuccess: ['list'],
  getOneWorkflow: ['id'],
  setOneWorkflowSuccess: ['workflow'],
  getWorkflowTypes: [],
  setWorkflowTypes: ['types'],
  createWorkflow: ['params', 'onSuccess'],
  updateWorkflow: ['params', 'id', 'onSuccess'],
  deactivateWorkflow: ['id', 'onSuccess'],
  updateLoaderState: ['loaderState', 'loaderName'],

  answerWorkflow: ['baseUrl', 'answer', 'onSuccess', 'onError']
})

export {
  Types as WorkflowTypes,
  Creators as WorkflowActions
}
