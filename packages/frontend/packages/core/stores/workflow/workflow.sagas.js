import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects'

import {
  MSG022,
  MSG023,
  MSG024,
  MSG003,
  MSG004,
  MSG028,
  MSG032,
  MSG0271
} from '@britania-crm/constants/feedbackMessages.constants'
import { errorTypes } from '@britania-crm/constants/workflow.constants'
import api from '@britania-crm/services/apis/crmApi'
import {
  getAllWorkflows,
  getOneWorkflow,
  getWorkflowTypes,
  createWorkflow,
  deactivateWorkflow,
  updateWorkflow
} from '@britania-crm/services/apis/crmApi/resources/workflow.service'

import { AppActions } from '../app/app.actions'
import {
  WorkflowTypes,
  WorkflowActions
} from './workflow.actions'

function* doGetAllWorkflows ({ params }) {
  try {
    const response = yield call(getAllWorkflows, params)

    yield put(WorkflowActions.setAllWorkflowsSuccess(response))
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG022 }))
    console.error(error)
  }
}

function* doGetOneWorkflow ({ id }) {
  try {
    const response = yield call(getOneWorkflow, id)

    yield put(WorkflowActions.setOneWorkflowSuccess(response))
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG023 }))
  }
}

function* doGetWorkflowTypes () {
  try {
    const response = yield call(getWorkflowTypes)

    yield put(WorkflowActions.setWorkflowTypes(response))
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG024 }))
  }
}

function* doCreateWorkflow ({ params, onSuccess }) {
  try {
    yield call(createWorkflow, params)

    yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))

    yield call(onSuccess)
  } catch ({ response }) {
    yield put(AppActions.addAlert({ type: 'error', message: errorTypes[response?.data?.errorCode] || MSG028 }))
  }
}

function* doUpdateWorkflow ({
  params, id, onSuccess
}) {
  try {
    yield put(WorkflowActions.updateLoaderState(true, 'save'))
    yield call(updateWorkflow, params, id)

    yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))

    yield call(onSuccess)
  } catch ({ response }) {
    yield put(AppActions.addAlert({ type: 'error', message: errorTypes[response?.data?.errorCode] || MSG028 }))
  } finally {
    yield put(WorkflowActions.updateLoaderState(false, 'save'))
  }
}

function* doDeactivateWorkflow ({ id, onSuccess }) {
  try {
    yield put(WorkflowActions.updateLoaderState(true, 'inactivate'))
    yield call(deactivateWorkflow, id)

    yield call(onSuccess)
    yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG032 }))
  } finally {
    yield put(WorkflowActions.updateLoaderState(false, 'inactivate'))
  }
}

function* doAnswerWorkflow ({
  baseUrl, answer, onSuccess = () => {}, onError = () => {}
}) {
  try {
    yield call(api.put, `${ baseUrl }/workflow`, answer)
    yield call(onSuccess)
    yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
  } catch (error) {
    if (error?.response?.status !== 403) {
      yield put(AppActions.addAlert({ type: 'error', message: error?.response?.data?.message }))
    } else {
      yield put(AppActions.addAlert({ type: 'error', message: MSG0271 }))
    }
    yield call(onError, error)
  }
}

export default [
  takeLatest(WorkflowTypes.GET_ALL_WORKFLOWS, doGetAllWorkflows),
  takeLatest(WorkflowTypes.GET_ONE_WORKFLOW, doGetOneWorkflow),
  takeLatest(WorkflowTypes.GET_WORKFLOW_TYPES, doGetWorkflowTypes),
  takeLatest(WorkflowTypes.CREATE_WORKFLOW, doCreateWorkflow),
  takeLatest(WorkflowTypes.DEACTIVATE_WORKFLOW, doDeactivateWorkflow),
  takeLatest(WorkflowTypes.UPDATE_WORKFLOW, doUpdateWorkflow),
  takeLatest(WorkflowTypes.ANSWER_WORKFLOW, doAnswerWorkflow)
]
