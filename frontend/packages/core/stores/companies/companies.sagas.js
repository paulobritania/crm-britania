import { put, call, takeLatest } from 'redux-saga/effects'

import { MSG027 } from '@britania-crm/constants/feedbackMessages.constants'
import {
  postCompany,
  putCompany,
  postCompanyBank,
  putCompanyBank
} from '@britania-crm/services/apis/crmApi/resources/company.service'

import { AppActions } from '../app/app.actions'
import { CompanyTypes } from './companies.actions'

function* doUpdateCompany({
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
    yield put(
      AppActions.addAlert({
        type: 'error',
        message: 'Falha ao solicitar alteração cadastral da empresa'
      })
    )
    yield call(onError)
  }
}

function* doSaveCompany({ params, onSuccess = () => {}, onError = () => {} }) {
  try {
    yield call(postCompany, params)
    yield put(
      AppActions.addAlert({
        type: 'success',
        message: 'Empresa cadastrada com sucesso!'
      })
    )

    yield call(onSuccess)
  } catch (error) {
    yield put(
      AppActions.addAlert({
        type: 'error',
        message: 'Falha ao salvar o empresa!'
      })
    )
    yield call(onError, error)
  }
}

function* saveCompanyBank({
  params,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    yield call(postCompanyBank, params)
    yield call(onSuccess)
    yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))
  } catch (error) {
    if (error.response.status === 403) {
      yield put(
        AppActions.addAlert({
          type: 'error',
          message: 'Você não possui acesso a esta conta.'
        })
      )
    }
  } finally {
    onError()
  }
}

function* editCompanyBank({
  id,
  params,
  onSuccess = () => {},
  onError = () => {}
}) {
  try {
    yield call(putCompanyBank, id, params)
    yield call(onSuccess)
    yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))
  } catch (error) {
    if (error.response.status === 403) {
      yield put(
        AppActions.addAlert({
          type: 'error',
          message: 'Você não possui acesso a esta conta.'
        })
      )
    }
  } finally {
    onError()
  }
}

export default [
  takeLatest(CompanyTypes.UPDATE_COMPANY, doUpdateCompany),
  takeLatest(CompanyTypes.SAVE_COMPANY, doSaveCompany),
  takeLatest(CompanyTypes.SAVE_COMPANY_BANK, saveCompanyBank),
  takeLatest(CompanyTypes.EDIT_COMPANY_BANK, editCompanyBank)
]
