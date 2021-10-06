import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects'

import { MSG027 } from '@britania-crm/constants/feedbackMessages.constants'
import {
  postCompany,
  putCompany
} from '@britania-crm/services/apis/crmApi/resources/company.service'

import { AppActions } from '../app/app.actions'
import { CompanyTypes } from './companies.actions'

function* doUpdateCompany ({
  params,
  id,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    yield call(putCompany, params, id)
    yield put(AppActions.addAlert({ type: 'success', message: MSG027 }))
    yield call(onSuccess)
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao solicitar alteração cadastral da empresa' }))
    yield call(onError)
  }
}

function* doSaveCompany ({
  params, onSuccess = () => {}, onError = () => {}
}) {
  try {
    yield call(postCompany, params)
    yield put(AppActions.addAlert({ type: 'success', message: 'Empresa cadastrada com sucesso!' }))

    yield call(onSuccess)
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha ao salvar o empresa!' }))
    yield call(onError, error)
  }
}

export default [
  takeLatest(CompanyTypes.UPDATE_COMPANY, doUpdateCompany),
  takeLatest(CompanyTypes.SAVE_COMPANY, doSaveCompany)
]
