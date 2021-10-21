import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects'

import { MSG0270 } from '@britania-crm/constants/feedbackMessages.constants'
import { getFields } from '@britania-crm/services/apis/crmApi/resources/fields.service'

import { AppActions } from '../app/app.actions'
import { FieldTypes } from './field.actions'

function* doGetFields ({
  accessId, onSuccess, onLoader
}) {
  try {
    const response = yield call(getFields, accessId)
    yield call(onSuccess, response)
  } catch (error) {
    yield put(AppActions.addAlert({ type: 'error', message: MSG0270 }))
    console.error(error)
  } finally {
    onLoader(false)
  }
}

export default [
  takeLatest(FieldTypes.GET_FIELDS, doGetFields)
]
