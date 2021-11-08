import { put, call, takeLatest } from 'redux-saga/effects'

import doDownloadFile from 'js-file-download'

import {
  MSG003,
  MSG033
} from '@britania-crm/constants/feedbackMessages.constants'
import { download } from '@britania-crm/services/apis/crmApi/resources/app.service'
import {
  saveFan,
  putFan,
  concludeFan,
  saveDocuments,
  deleteDocument
} from '@britania-crm/services/apis/crmApi/resources/fan.service'
import { upload } from '@britania-crm/services/apis/crmApi/resources/file.service'

import { AppActions } from '../app/app.actions'
import { FanTypes } from './fan.actions'

function* doSaveFan({ fan, onSuccess = () => {}, onError = () => {} }) {
  try {
    const response = yield call(saveFan, fan)
    yield call(onSuccess, response.data)
    yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))
  } catch (error) {
    yield call(onError, false)
    yield put(
      AppActions.addAlert({ type: 'error', message: 'Falha ao cadastrar FAN.' })
    )
  }
}

function* doConcludeFan({ id, onSuccess = () => {}, onError = () => {} }) {
  try {
    yield call(concludeFan, id)
    yield call(onSuccess)
    yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))
  } catch (error) {
    yield call(onError, false)
    yield put(
      AppActions.addAlert({
        type: 'error',
        message: 'Falha ao iniciar fluxo de tarefa do FAN.'
      })
    )
  }
}

function* doUpdateFan({
  id,
  params,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    yield call(putFan, id, params)
    yield call(onSuccess)
    yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))
  } catch (error) {
    yield call(onError, false)
    yield put(
      AppActions.addAlert({ type: 'error', message: 'Falha ao editar FAN.' })
    )
  }
}

function* doUploadFileFan({ data, idFan, onSuccess }) {
  try {
    if (!data?.path) {
      const formData = new FormData()
      formData.append('file', data.file)
      const response = yield call(upload, formData)
      yield call(onSuccess, {
        ...data,
        ...response,
        fileId: response.id
      })

      yield call(saveDocuments, idFan, {
        documents: [
          {
            description: data.description,
            fileId: response.id,
            filename: data.filename
          }
        ]
      })

      yield put(
        AppActions.addAlert({
          type: 'success',
          message: 'Arquivo salvo com sucesso!'
        })
      )
    } else {
      yield call(onSuccess, data)
    }
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG033 }))
  }
}

function* doDeleteFileFan({ id, onSuccess }) {
  try {
    yield call(deleteDocument, id)
    yield call(onSuccess)
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG033 }))
  }
}

function* doDowloadFileFan({ url, filename }) {
  try {
    const response = yield call(download, encodeURIComponent(url))

    doDownloadFile(response, filename)
  } catch (error) {
    yield put(
      AppActions.addAlert({
        type: 'error',
        message: 'Falha ao baixar arquivo!'
      })
    )
  }
}

export default [
  takeLatest(FanTypes.SAVE_FAN, doSaveFan),
  takeLatest(FanTypes.CONCLUDE_FAN, doConcludeFan),
  takeLatest(FanTypes.UPDATE_FAN, doUpdateFan),
  takeLatest(FanTypes.UPLOAD_FILE_FAN, doUploadFileFan),
  takeLatest(FanTypes.DOWNLOAD_FILE_FAN, doDowloadFileFan),
  takeLatest(FanTypes.DELETE_FILE_FAN, doDeleteFileFan)
]
