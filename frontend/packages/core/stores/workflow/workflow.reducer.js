import { createReducer } from 'reduxsauce'

import { WorkflowTypes } from './workflow.actions'

const INITIAL_STATE = {
  allWorkflows: [],
  workflow: {},
  types: [],
  loading: {
    save: false,
    inactivate: false
  }
}

const setAllWorkflowsSuccess = (state = INITIAL_STATE, { list }) => ({
  ...state,
  allWorkflows: list
})

const setOneWorkflowSuccess = (state = INITIAL_STATE, { workflow }) => ({
  ...state,
  workflow
})

const setWorkflowTypes = (state = INITIAL_STATE, { types }) => {
  const newTypes = types.map((item) => ({
    name: item.code, description: item.description, id: item.id
  }))
  return {
    ...state,
    types: newTypes
  }
}

const clearWorkflowDetails = (state = INITIAL_STATE) => ({
  ...state,
  workflow: {}
})

const updateLoaderState = (state, { loaderState, loaderName }) => ({
  ...state,
  loading: {
    ...state.loading,
    [loaderName]: loaderState
  }
})

export default createReducer(INITIAL_STATE, {
  [WorkflowTypes.SET_ALL_WORKFLOWS_SUCCESS]: setAllWorkflowsSuccess,
  [WorkflowTypes.SET_ONE_WORKFLOW_SUCCESS]: setOneWorkflowSuccess,
  [WorkflowTypes.SET_WORKFLOW_TYPES]: setWorkflowTypes,
  [WorkflowTypes.GET_ONE_WORKFLOW]: clearWorkflowDetails,
  [WorkflowTypes.UPDATE_LOADER_STATE]: updateLoaderState

})
