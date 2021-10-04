import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects'

import { MSG026 } from '@britania-crm/constants/feedbackMessages.constants'
import { getAllAccesses } from '@britania-crm/services/apis/crmApi/resources/access.service'

import { AppActions } from '../app/app.actions'
import {
  AccessTypes,
  AccessActions
} from './access.actions'

function* doGetAllAccesses () {
  try {
    const response = yield call(getAllAccesses)

    yield put(AccessActions.setAllAccesses(response))
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG026 }))
    console.error(error)
  }
}

export default [
  takeLatest(AccessTypes.GET_ALL_ACCESSES, doGetAllAccesses)
]
