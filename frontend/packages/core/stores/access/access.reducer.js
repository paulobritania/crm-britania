import { createReducer } from 'reduxsauce'

import { AccessTypes } from './access.actions'

const INITIAL_STATE = { accesses: [] }

const setAllAccesses = (state = INITIAL_STATE, { accesses }) => ({
  ...state,
  accesses
})

export default createReducer(INITIAL_STATE, { [AccessTypes.SET_ALL_ACCESSES]: setAllAccesses })
