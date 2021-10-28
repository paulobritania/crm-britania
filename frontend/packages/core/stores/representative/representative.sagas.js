import { put, call, takeLatest } from 'redux-saga/effects'

import doDownloadFile from 'js-file-download'

import {
  MSG027,
  MSG033
} from '@britania-crm/constants/feedbackMessages.constants'
import { download } from '@britania-crm/services/apis/crmApi/resources/app.service'
import {
  deleteFile,
  upload
} from '@britania-crm/services/apis/crmApi/resources/file.service'
import {
  saveRepresentative,
  concludeRepresentative,
  updateRepresentative
} from '@britania-crm/services/apis/crmApi/resources/representative.service'

import { AppActions } from '../app/app.actions'
import { RepresentativeTypes } from './representative.actions'

function* doSaveRepresentative({
  representative,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    const { status } = yield call(saveRepresentative, representative)

    if (status === 201) {
      yield call(onSuccess)
      yield put(
        AppActions.addAlert({
          type: 'success',
          message: 'Cadastro salvo com sucesso!'
        })
      )
    }
  } catch (error) {
    yield put(
      AppActions.addAlert({
        type: 'error',
        message: 'Falha ao solicitar pré-cadastro de representante'
      })
    )
    yield call(onError)
  }
}

function* doConcludeRepresentative({
  representative,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    const { status } = yield call(concludeRepresentative, representative)

    if (status === 201) {
      yield call(onSuccess)
      yield put(
        AppActions.addAlert({
          type: 'success',
          message: 'Workflow em andamento'
        })
      )
    }
  } catch (error) {
    yield put(
      AppActions.addAlert({
        type: 'error',
        message:
          'Falha ao concluir o salvamento do pré-cadastro de representante'
      })
    )
    yield call(onError)
  }
}

function* doUpdateRepresentative({
  params,
  id,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    const { status } = yield call(updateRepresentative, params, id)

    if (status === 200) {
      yield call(onSuccess)
      yield put(AppActions.addAlert({ type: 'success', message: MSG027 }))
    }
  } catch (error) {
    yield put(
      AppActions.addAlert({
        type: 'error',
        message: 'Falha ao solicitar alteração cadastral do representante'
      })
    )
    yield call(onError)
  }
}

function* doUploadFileRepresentative({ data, onSuccess }) {
  try {
    if (data?.file instanceof File) {
      const formData = new FormData()
      formData.append('file', data.file)
      const response = yield call(upload, formData)

      yield call(onSuccess, {
        ...data,
        file: { ...response },
        fileId: response.id,
        path: response?.path
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

function* doDeleteFileRepresentative({ data, onSuccess }) {
  try {
    yield call(deleteFile, data)
    yield call(onSuccess)
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG033 }))
  }
}

function* doDowloadFileRepresentative({ url, filename, onSuccess = () => {} }) {
  try {
    const response = yield call(download, encodeURIComponent(url))

    doDownloadFile(response, filename)
    yield call(onSuccess, false)
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
  takeLatest(RepresentativeTypes.SAVE_REPRESENTATIVE, doSaveRepresentative),
  takeLatest(
    RepresentativeTypes.CONCLUDE_REPRESENTATIVE,
    doConcludeRepresentative
  ),
  takeLatest(RepresentativeTypes.UPDATE_REPRESENTATIVE, doUpdateRepresentative),
  takeLatest(
    RepresentativeTypes.UPLOAD_FILE_REPRESENTATIVE,
    doUploadFileRepresentative
  ),
  takeLatest(
    RepresentativeTypes.DOWNLOAD_FILE_REPRESENTATIVE,
    doDowloadFileRepresentative
  ),
  takeLatest(
    RepresentativeTypes.DELETE_FILE_REPRESENTATIVE,
    doDeleteFileRepresentative
  )
]
