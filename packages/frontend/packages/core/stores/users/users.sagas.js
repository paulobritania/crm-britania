import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects'

import { MSG004 } from '@britania-crm/constants/feedbackMessages.constants'
import {
  postUser,
  putUser,
  deleteUser,
  attachProfiles
} from '@britania-crm/services/apis/crmApi/resources/user.service'

import { AppActions } from '../app/app.actions'
import {
  UsersActions,
  UsersTypes
} from './users.actions'

function* saveUser ({
  user, onSuccess = () => {}, onError = () => {}
}) {
  try {
    const { id, ...restUser } = user

    let response

    if (!id) {
      // createMode
      response = yield call(postUser, restUser)
    } else {
      // edit mode
      response = yield call(putUser, id, restUser)
    }

    yield call(onSuccess, response)
  } catch (error) {
    yield put(UsersActions.usersError(error))
    yield call(onError, error)
  }
}

function* removeUser ({
  userId, onSuccess = () => {}, onError = () => {}
}) {
  try {
    yield call(deleteUser, userId)
    yield call(onSuccess)
  } catch (error) {
    yield put(UsersActions.usersError(error))
    yield call(onError, error)
  }
}

function* doAttachProfiles ({
  userId, profilesId, onSuccess = () => {}, onError = () => {}
}) {
  try {
    yield call(attachProfiles, userId, { profiles: profilesId })
    yield call(onSuccess)
    yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
  } catch (error) {
    yield put(UsersActions.usersError(error))
    yield put(AppActions.addAlert({ type: 'error', message: 'Falha em vincular perfis ao usuário.' }))
    yield call(onError, error)
  }
}

export default [
  takeLatest(UsersTypes.SAVE_USER, saveUser),
  takeLatest(UsersTypes.REMOVE_USER, removeUser),
  takeLatest(UsersTypes.ATTACH_PROFILES, doAttachProfiles)
]
