import {
  call,
  put,
  takeEvery
} from 'redux-saga/effects'

import doDownloadFile from 'js-file-download'

import {
  createReminder,
  deleteReminder,
  getRemindersFromApi,
  updateReminder,
  download
} from '@britania-crm/services/apis/crmApi/resources/app.service'

import {
  AppActions,
  AppTypes
} from './app.actions'

function* createNewReminderRequest () {
  try {
    const id = yield call(createReminder, { content: '' })
    const reminderCreated = { id, content: '' }

    yield put(AppActions.createNewReminderSuccess(reminderCreated))
  } catch (err) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao salvar lembrete.' }))
    // console.log('ERROR IN SAGA | action: createNewReminderRequest =>', err)
  }
}

function* getAllReminders () {
  try {
    const reminders = yield call(getRemindersFromApi)

    yield put(AppActions.setAllReminders(reminders))
  } catch (err) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha em listar os lembretes.' }))
    // console.log('ERROR IN SAGA | action: getAllReminders =>', err)
  }
}

function* closeReminder ({ reminderId }) {
  try {
    yield call(deleteReminder, { reminderId })
  } catch (err) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao remover o lembrete.' }))
    // console.log('ERROR IN SAGA | action: removeReminder =>', err)
  }
}

function* saveReminder ({ content, reminderId }) {
  try {
    yield call(updateReminder, content, reminderId)
  } catch (err) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao salvar o lembrete.' }))
    // console.log('ERROR IN SAGA | action: saveReminder =>', err)
  }
}

function* downloadFile ({ url, filename = 'file' }) {
  try {
    const response = yield call(download, encodeURIComponent(url))

    doDownloadFile(response, filename)
  } catch (err) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao baixar o arquivo.' }))
  }
}

export default [
  takeEvery(AppTypes.CREATE_NEW_REMINDER_REQUEST, createNewReminderRequest),
  takeEvery(AppTypes.GET_ALL_REMINDERS, getAllReminders),
  takeEvery(AppTypes.CLOSE_REMINDER, closeReminder),
  takeEvery(AppTypes.DOWNLOAD_FILE, downloadFile),
  takeEvery(AppTypes.SAVE_REMINDER, saveReminder)
]
