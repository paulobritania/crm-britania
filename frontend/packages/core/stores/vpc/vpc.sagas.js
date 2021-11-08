import { put, call, all, takeLatest } from 'redux-saga/effects'

import doDownloadFile from 'js-file-download'

import map from 'lodash/map'

import {
  MSG003,
  MSG033
} from '@britania-crm/constants/feedbackMessages.constants'
import { download } from '@britania-crm/services/apis/crmApi/resources/app.service'
import {
  deleteFile,
  upload
} from '@britania-crm/services/apis/crmApi/resources/file.service'
import {
  postVpc,
  putVpc,
  startWorkflowVpc
} from '@britania-crm/services/apis/crmApi/resources/vpc.service'

import { AppActions } from '../app/app.actions'
import { VpcTypes, VpcActions } from './vpc.actions'

const doUploadFileVpc = async (file, description) => {
  const formData = new FormData()
  formData.append('file', file)
  const { id } = await upload(formData)

  return { fileId: id, description }
}

function* saveVpc({
  vpc,
  startWorkflow,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    const infoFileUpload = yield all(
      map(vpc.attachments, (item) =>
        call(doUploadFileVpc, item.file, item.description)
      )
    )

    const newVpc = {
      ...vpc,
      attachments: infoFileUpload
    }

    const response = yield call(postVpc, newVpc)

    if (startWorkflow) {
      yield put(VpcActions.startWorkflowVpc(response?.id))
    }

    yield call(onSuccess)
    yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))
  } catch (error) {
    yield put(
      AppActions.addAlert({ type: 'error', message: 'Falha ao cadastrar VPC.' })
    )
    yield call(onError, error)
  }
}

function* editVpc({
  id,
  vpc,
  startWorkflow,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    const infoFileUpload = yield all(
      map(vpc.attachments, (item) => {
        if (item?.file instanceof File) {
          return call(doUploadFileVpc, item.file, item.description)
        }
        return item
      })
    )

    const newVpc = {
      ...vpc,
      attachments: infoFileUpload
    }

    yield call(putVpc, id, newVpc)

    if (startWorkflow) {
      yield put(VpcActions.startWorkflowVpc(id))
    }

    yield call(onSuccess)
    yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))
  } catch (error) {
    yield put(
      AppActions.addAlert({ type: 'error', message: 'Falha ao editar VPC.' })
    )
    yield call(onError, error)
  }
}

function* doStartWorkflowVpc({ id }) {
  try {
    yield call(startWorkflowVpc, id)
  } catch (error) {
    yield put(
      AppActions.addAlert({
        type: 'error',
        message: 'Falha ao iniciar fluxo de tarefas do VPC atual.'
      })
    )
  }
}

function* doDeleteFileVpc({ data, onSuccess }) {
  try {
    yield call(deleteFile, data)
    yield call(onSuccess)
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG033 }))
  }
}

function* doDowloadFileVpc({ url, filename, onSuccess }) {
  try {
    const response = yield call(download, encodeURIComponent(url))

    yield call(doDownloadFile, response, filename)
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
  takeLatest(VpcTypes.SAVE_VPC, saveVpc),
  takeLatest(VpcTypes.EDIT_VPC, editVpc),
  takeLatest(VpcTypes.START_WORKFLOW_VPC, doStartWorkflowVpc),
  takeLatest(VpcTypes.UPLOAD_FILE_VPC, doUploadFileVpc),
  takeLatest(VpcTypes.DOWNLOAD_FILE_VPC, doDowloadFileVpc),
  takeLatest(VpcTypes.DELETE_FILE_VPC, doDeleteFileVpc)
]
