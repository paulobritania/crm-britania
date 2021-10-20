import {
  put,
  call,
  takeLatest,
  take,
  all
} from 'redux-saga/effects'

import doDownloadFile from 'js-file-download'

import endsWith from 'lodash/endsWith'
import filter from 'lodash/filter'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import reduce from 'lodash/reduce'
import set from 'lodash/set'

import {
  MSG017,
  MSG027
} from '@britania-crm/constants/feedbackMessages.constants'
import { INITIAL_VALUES_DOCUMENTS } from '@britania-crm/forms/schemas/customer/documents.schema'
import { download } from '@britania-crm/services/apis/crmApi/resources/app.service'
import {
  updateCustomer,
  postCustomerPreRegistry,
  putCustomerPreRegistry,
  putFinishCustomerPreRegistry
} from '@britania-crm/services/apis/crmApi/resources/customer.service'
import {
  // deleteFile,
  uploadSingleFile
} from '@britania-crm/services/apis/crmApi/resources/file.service'
import { putRankingsChangeRanking } from '@britania-crm/services/apis/crmApi/resources/rankink.service'

import { AppActions } from '../app/app.actions'
import {
  CustomerActions,
  CustomerTypes
} from './customer.actions'

function* doUpdateCustomer ({
  params,
  id,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    const { status } = yield call(updateCustomer, params, id)

    if (status === 200) {
      yield call(onSuccess)
      yield put(AppActions.addAlert({ type: 'success', message: MSG027 }))
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      yield put(AppActions.addAlert({ type: 'error', message: error?.response?.data?.message }))
    } else {
      yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao solicitar alteração cadastral do cliente' }))
    }
    yield call(onError)
  }
}

function* doChangeRankings ({
  matrixCode,
  params,
  onSuccess = () => {}
}) {
  try {
    yield call(putRankingsChangeRanking, matrixCode, params)
    yield put(AppActions.addAlert({ type: 'success', message: MSG017 }))
    yield call(onSuccess)
  } catch (error) {
    console.error('Error onn change ranking', error)
  }
}

function* doDowloadFileCustomer ({ url, filename }) {
  try {
    const response = yield call(download, encodeURIComponent(url))

    doDownloadFile(response, filename)
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao baixar arquivo!' }))
  }
}

const doUploadFileCustomer = async (file, fieldName) => {
  const formData = new FormData()
  formData.append('file', file)
  const { id } = await uploadSingleFile(formData)
  return { [fieldName]: id }
}

function* doSaveCustomerPreRegistry ({
  client: { documents, ...client },
  oldClient,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    const filesToDelete = reduce(
      oldClient?.documents,
      (acc, doc, fieldName) => {
        if (!isEmpty(doc)) {
          if (isArray(doc)) {
            const docsToRemove = reduce(
              filter(doc, (d) => !find(
                documents[fieldName],
                (newDoc) => newDoc?.fileId === d?.fileId
              )),
              (acc2, d, index) => ({
                ...acc2,
                [`${ fieldName }[${ index }]`]: d.file
              }),
              {}
            )
            if (!isEmpty(docsToRemove)) {
              return {
                ...acc,
                ...docsToRemove
              }
            }
          } else if (documents[fieldName]?.id !== doc?.id) {
            return {
              ...acc,
              [fieldName]: doc
            }
          }
        }
        return acc
      },
      {}
    )

    const removedObj = {}
    forEach(filesToDelete, (file, fieldName) => {
      set(removedObj, fieldName, file)
    })

    const filesToUpload = reduce(
      documents,
      (acc, doc, fieldName) => {
        if (doc instanceof File) {
          return {
            ...acc,
            [`${ fieldName }Id`]: doc
          }
        } else if (isArray(doc) && !isEmpty(doc)) {
          return {
            ...acc,
            ...reduce(
              filter(doc, (d) => d instanceof File),
              (acc2, d, index) => ({
                ...acc2,
                [`${ `${ fieldName }FileIds` }[${ index }]`]: d
              }),
              {}
            )
          }
        }
        return acc
      },
      {}
    )

    const uploadedIds = yield all(map(
      filesToUpload,
      (file, fieldName) => call(doUploadFileCustomer, file, fieldName)
    ))

    const uploadedObj = {}
    forEach(uploadedIds, (fileObj) => {
      forEach(fileObj, (fileId, fieldName) => {
        set(uploadedObj, fieldName, fileId)
      })
    })

    const newDocumentsAfterDelete = reduce(
      INITIAL_VALUES_DOCUMENTS,
      (acc, doc, fieldName) => {
        if (endsWith(fieldName, 'Id')) {
          return acc
        }

        if (!isArray(doc) && !removedObj[fieldName]) {
          return {
            ...acc,
            [`${ fieldName }Id`]: documents[fieldName]?.id || null
          }
        }

        if (isArray(doc)) {
          return {
            ...acc,
            [`${ fieldName }FileIds`]: filter(
              map(
                filter(documents[fieldName], (file) => !find(removedObj[fieldName], (fileRemoved) => file?.fileId === fileRemoved.id)),
                (file) => file?.fileId
              ),
              (file) => !!file
            )
          }
        }

        return {
          ...acc,
          [`${ fieldName }Id`]: null
        }
      },
      {}
    )

    const newDocumentsAfterUpload = mapValues(
      newDocumentsAfterDelete,
      (doc, fieldName) => {
        if (uploadedObj[fieldName]) {
          if (isArray(doc)) {
            return [...doc, ...uploadedObj[fieldName]]
          }
          return uploadedObj[fieldName]
        }
        return doc
      }
    )

    let id = client.id
    if (!id) {
      const { data } = yield call(postCustomerPreRegistry, { ...client, documents: newDocumentsAfterUpload })
      id = data.id
      yield put(AppActions.addAlert({ type: 'success', message: 'Cliente pré-cadastrado com sucesso!' }))
    } else {
      yield call(putCustomerPreRegistry, { ...client, documents: newDocumentsAfterUpload }, id)
      yield put(AppActions.addAlert({ type: 'success', message: 'Pré-cadastrado atualizado com sucesso!' }))
    }

    yield call(onSuccess, id)
    yield put(CustomerActions.saveCustomerPreRegistrySuccess())

    // do delete files async
    // yield all(map(filesToDelete, (file) => call(deleteFile, file.id)))
  } catch (error) {
    console.error('error', error)

    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao salvar o cliente!' }))
    yield call(onError, error)
  }
}

function* doFinishCustomerPreRegistry ({
  client, oldClient, onSuccess = () => {}, onError = () => {}
}) {
  try {
    let id = client.id
    yield put(CustomerActions.saveCustomerPreRegistry(
      client,
      oldClient,
      (newId) => { id = newId },
      onError
    ))
    yield take(CustomerTypes.SAVE_CUSTOMER_PRE_REGISTRY_SUCCESS)
    if (id) {
      yield call(putFinishCustomerPreRegistry, {}, id)

      yield put(AppActions.addAlert({ type: 'success', message: 'Pré-cadastrado concluído com sucesso!' }))
      yield call(onSuccess, id)
    }
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao concluir o cadastro do cliente!' }))
    yield call(onError, error)
  }
}

export default [
  takeLatest(CustomerTypes.UPDATE_CUSTOMER, doUpdateCustomer),
  takeLatest(CustomerTypes.CHANGE_RANKINGS, doChangeRankings),
  takeLatest(CustomerTypes.DOWNLOAD_FILE_CUSTOMER, doDowloadFileCustomer),

  takeLatest(CustomerTypes.SAVE_CUSTOMER_PRE_REGISTRY, doSaveCustomerPreRegistry),
  takeLatest(CustomerTypes.FINISH_CUSTOMER_PRE_REGISTRY, doFinishCustomerPreRegistry)
]
