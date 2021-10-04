import {
  put,
  call,
  all,
  takeLatest
} from 'redux-saga/effects'

import map from 'lodash/map'
import reverse from 'lodash/reverse'

import {
  MSG003,
  MSG004
} from '@britania-crm/constants/feedbackMessages.constants'
import {
  getAllMessage,
  getOneMessage,
  createMessage,
  updateMessage,
  deleteMessage,
  deleteMessageAttachment,
  searchMessages
} from '@britania-crm/services/apis/crmApi/resources/message.service'

import { AppActions } from '../app/app.actions'
import {
  MessageActions,
  MessageTypes
} from './message.actions'

function* doGetAllMessages () {
  try {
    const response = yield call(getAllMessage)

    yield put(MessageActions.setAllMessageSuccess(reverse(response)))
  } catch (error) {
    console.error(error)
  }
}

function* doGetOneMessage ({ id }) {
  try {
    const response = yield call(getOneMessage, id)

    yield put(MessageActions.setOneMessageSuccess(response))

    const profiles = map(response?.messageProfile, (item) => item && item.profile[0])

    yield put(MessageActions.setProfilesSelected(profiles))
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao buscar recado.' }))
  }
}

function* doCreateMessage ({
  params, onSuccess = () => {}, onError = () => {}
}) {
  try {
    yield put(MessageActions.setLoading(true))

    const { status } = yield call(createMessage, params)

    if (status === 201) {
      yield call(onSuccess)
      yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))
    }
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao salvar recado.' }))
    yield call(onError)
  } finally {
    yield put(MessageActions.setLoading(false))
  }
}

function* doUpdateMessage ({
  id, params, onSuccess = () => {}, onError = () => {}
}) {
  try {
    yield put(MessageActions.setLoading(true))

    const { status } = yield call(updateMessage, { params, id })

    if (status === 200) {
      yield call(onSuccess)
      yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
    }
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao editar recado.' }))
    yield call(onError)
  } finally {
    yield put(MessageActions.setLoading(false))
  }
}

function* doDeleteMessage ({
  id, onSuccess = () => {}, onError = () => {}
}) {
  try {
    const { status } = yield call(deleteMessage, id)

    if (status === 200) {
      yield call(onSuccess)
      yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
    }
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao excluir recado.' }))
    yield call(onError)
  }
}

function* doDeleteMessageAttachment ({
  id, files, onSuccess
}) {
  try {
    yield all(map(files, (file) => call(deleteMessageAttachment, id, file.fileId)))

    yield call(onSuccess)
    // yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
  } catch (error) {
    // yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao excluir anexo.' }))
  }
}

function* doGetFilteredMessages ({ filters }) {
  try {
    const response = yield call(searchMessages, filters)

    yield put(MessageActions.setAllFilterMessageSuccess(response))
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Recados não localizados.' }))
  }
}

export default [
  takeLatest(MessageTypes.GET_ALL_MESSAGE, doGetAllMessages),
  takeLatest(MessageTypes.GET_ONE_MESSAGE, doGetOneMessage),
  takeLatest(MessageTypes.CREATE_MESSAGE, doCreateMessage),
  takeLatest(MessageTypes.UPDATE_MESSAGE, doUpdateMessage),
  takeLatest(MessageTypes.DELETE_MESSAGE, doDeleteMessage),
  takeLatest(MessageTypes.DELETE_MESSAGE_ATTACHMENT, doDeleteMessageAttachment),
  takeLatest(MessageTypes.GET_FILTERED_MESSAGES, doGetFilteredMessages)
]
