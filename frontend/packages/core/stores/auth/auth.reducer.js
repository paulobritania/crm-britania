import { createReducer } from 'reduxsauce'

import jwtDecode from 'jwt-decode'

import { AUTH_STATUS } from '@britania-crm/constants/auth.constants'

import { AuthTypes } from './auth.actions'

const INITIAL_STATE = {
  accessToken: null,
  error: null,
  status: AUTH_STATUS.IDLE, // loading | success | failed
  rememberUser: false,
  jwtContent: {},
  user: {}
}

const authError = (state = INITIAL_STATE, { error }) => ({
  ...state,
  error
})

const login = (state = INITIAL_STATE, { rememberUser }) => ({
  ...state,
  rememberUser
})

const loginSuccess = (state = INITIAL_STATE, {
  accessToken,
  expirationDate,
  user
}) => ({
  ...state,
  error: INITIAL_STATE.error,
  status: AUTH_STATUS.SUCCESS,
  accessToken,
  expirationDate,
  jwtContent: jwtDecode(accessToken),
  user
})

const setAuthStatus = (state = INITIAL_STATE, { status }) => ({
  ...state,
  status
})

const logout = (state = INITIAL_STATE) => ({
  ...INITIAL_STATE,
  rememberUser: state.rememberUser
})

export default createReducer(INITIAL_STATE, {
  [AuthTypes.LOGIN]: login,
  [AuthTypes.LOGIN_SUCCESS]: loginSuccess,
  [AuthTypes.AUTH_ERROR]: authError,
  [AuthTypes.SET_AUTH_STATUS]: setAuthStatus,
  [AuthTypes.LOGOUT]: logout
})
