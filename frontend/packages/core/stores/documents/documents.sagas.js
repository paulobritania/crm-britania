import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects'

import {
  MSG003,
  MSG004,
  MSG033
} from '@britania-crm/constants/feedbackMessages.constants'
import {
  createDocument,
  updateDocument,
  deleteDocument
} from '@britania-crm/services/apis/crmApi/resources/document.service'
import { AppActions } from '@britania-crm/stores/app/app.actions'

import { DocumentsTypes } from './documents.actions'

function* doCreateDocument ({
  params,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    const { status } = yield call(createDocument, params)

    if (status === 201) {
      yield call(onSuccess)
      yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))
    }
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG033 }))
    yield call(onError)
  }
}

function* doUpdateDocument ({
  params,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    const { status } = yield call(updateDocument, params)

    if (status === 200) {
      yield call(onSuccess)
      yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
    }
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG033 }))
    yield call(onError)
  }
}

function* doDeleteDocument ({ id, onSuccess }) {
  try {
    const response = yield call(deleteDocument, id)
    if (response.status === 200) {
      yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
    }
  } catch (error) {
    console.warn(error)
  } finally {
    onSuccess()
  }
}

export default [
  takeLatest(DocumentsTypes.CREATE_DOCUMENT, doCreateDocument),
  takeLatest(DocumentsTypes.UPDATE_DOCUMENT, doUpdateDocument),
  takeLatest(DocumentsTypes.DELETE_DOCUMENT, doDeleteDocument)
]
