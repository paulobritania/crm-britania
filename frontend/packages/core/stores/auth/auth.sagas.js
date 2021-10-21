import {
  put,
  takeLatest
} from 'redux-saga/effects'

import { AUTH_STATUS } from '@britania-crm/constants/auth.constants'
import { loginInApplication } from '@britania-crm/services/apis/crmApi/resources/auth.service'
import { encode } from '@britania-crm/utils/crypto'

import {
  AuthActions,
  AuthTypes
} from './auth.actions'

function* login ({
  login, password, rememberUser
}) {
  try {
    yield put(AuthActions.setAuthStatus(AUTH_STATUS.LOADING))

    const {
      accessToken,
      expirationDate,
      user
    } = yield loginInApplication(login, password)

    if (accessToken) {
      yield put(AuthActions.loginSuccess(
        accessToken,
        expirationDate,
        user
      ))
    }

    if (rememberUser) {
      localStorage.setItem('login', login)
      localStorage.setItem('password', encode(password))
    } else {
      localStorage.removeItem('login')
      localStorage.removeItem('password')
    }
  } catch (error) {
    yield put(AuthActions.authError(error?.response))
  } finally {
    yield put(AuthActions.setAuthStatus(AUTH_STATUS.IDLE))
  }
}

export default [
  takeLatest(AuthTypes.LOGIN, login)
]
