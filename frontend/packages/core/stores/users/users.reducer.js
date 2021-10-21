import { createReducer } from 'reduxsauce'

import { AuthTypes } from '../auth'
import { UsersTypes } from './users.actions'

const INITIAL_STATE = { error: null }

const usersError = (state = INITIAL_STATE, { error }) => ({
  ...state,
  error
})

const logout = () => ({ ...INITIAL_STATE })

export default createReducer(INITIAL_STATE, {
  [UsersTypes.USERS_ERROR]: usersError,
  [AuthTypes.LOGOUT]: logout
})
