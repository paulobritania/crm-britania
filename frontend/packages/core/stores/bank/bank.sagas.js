import { put, call, takeLatest } from 'redux-saga/effects'

import { MSG003 } from '@britania-crm/constants/feedbackMessages.constants'
import {
  postBank,
  putBank
} from '@britania-crm/services/apis/crmApi/resources/bank.service'

import { AppActions } from '../app/app.actions'
import { BankTypes } from './bank.actions'

function* saveBank({ params, onSuccess = () => {}, onError = () => {} }) {
  try {
    yield call(postBank, params)
    yield call(onSuccess)
    yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))
  } catch (error) {
    if (error.response.status === 403) {
      yield put(
        AppActions.addAlert({
          type: 'error',
          message: 'Você não possui acesso a este cliente.'
        })
      )
    }
  } finally {
    onError()
  }
}

function* editBank({ id, params, onSuccess = () => {}, onError = () => {} }) {
  try {
    yield call(putBank, id, params)
    yield call(onSuccess)
    yield put(AppActions.addAlert({ type: 'success', message: MSG003 }))
  } catch (error) {
    if (error.response.status === 403) {
      yield put(
        AppActions.addAlert({
          type: 'error',
          message: 'Você não possui acesso a este cliente.'
        })
      )
    }
  } finally {
    onError()
  }
}

export default [
  takeLatest(BankTypes.SAVE_BANK, saveBank),
  takeLatest(BankTypes.EDIT_BANK, editBank)
]
