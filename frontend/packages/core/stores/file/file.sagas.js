// import jwtDecode from 'jwt-decode'
import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects'

import doDownloadFile from 'js-file-download'

import { MSG033 } from '@britania-crm/constants/feedbackMessages.constants'
import {
  deleteFile,
  uploadSingleFile,
  downloadFile
} from '@britania-crm/services/apis/crmApi/resources/file.service'

import { AppActions } from '../app/app.actions'
import { FileTypes } from './file.actions'

function* doDeleteFile ({ id, onSuccess }) {
  try {
    const { status } = yield call(deleteFile, id)

    if (status === 200) {
      onSuccess()
    }
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao excluir arquivo.' }))
  }
}

function* doUploadImage ({ data, onSuccess }) {
  try {
    if (!data?.id) {
      const formData = new FormData()
      formData.append('file', data)
      const { id } = yield call(uploadSingleFile, formData)
      onSuccess(id)
    } else {
      onSuccess(data.id)
    }
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG033 }))
  }
}

function* doDownload ({
  url, name, onSuccess = () => {}
}) {
  try {
    const response = yield call(downloadFile, url)
    yield call(doDownloadFile, response, name)
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao baixar o arquivo.' }))
  } finally {
    yield call(onSuccess, false)
  }
}

export default [
  takeLatest(FileTypes.DELETE_FILE, doDeleteFile),
  takeLatest(FileTypes.UPLOAD_IMAGE, doUploadImage),
  takeLatest(FileTypes.DOWNLOAD, doDownload)
]
