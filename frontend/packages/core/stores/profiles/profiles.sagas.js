// import jwtDecode from 'jwt-decode'
import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects'

import { MSG004 } from '@britania-crm/constants/feedbackMessages.constants'
import {
  updateProfile,
  createProfile,
  getAllProfilesFromApi,
  deleteProfile,
  patchProfileStatusFromApi
} from '@britania-crm/services/apis/crmApi/resources/profile.service'
import { AppActions } from '@britania-crm/stores/app/app.actions'

import {
  ProfilesActions,
  ProfilesTypes
} from './profiles.actions'

function* doGetAllProfiles () {
  try {
    const response = yield call(getAllProfilesFromApi)
    yield put(ProfilesActions.setAllProfilesSuccess(response))
  } catch (error) {
    console.error(error)
  }
}

function* doCreateProfiles ({ params, onSuccess }) {
  try {
    const response = yield call(createProfile, params)
    if (response.status === 201) {
      onSuccess()
      yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
    }
  } catch (error) {
    console.warn(error)
    yield put(AppActions.addAlert({ type: 'error', message: 'Error ao tentar salvar o perfil' }))
  }
}

function* doEditProfiles ({
  id, params, onSuccess
}) {
  try {
    const response = yield call(updateProfile, id, params)
    if (response.status === 200) {
      onSuccess()
      yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
    }
  } catch (error) {
    console.warn(error)
  }
}

function* doDeleteProfile ({ id, onSuccess }) {
  try {
    const response = yield call(deleteProfile, id)
    if (response.status === 200) {
      yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
    }
  } catch (error) {
    console.warn(error)
  } finally {
    onSuccess()
  }
}

function* doPatchProfileStatus ({ id, onSuccess }) {
  try {
    const response = yield call(patchProfileStatusFromApi, id)
    if (response.status === 200) {
      yield put(AppActions.addAlert({ type: 'success', message: MSG004 }))
    }
  } catch (error) {
    console.warn(error)
  } finally {
    onSuccess()
  }
}

export default [
  takeLatest(ProfilesTypes.GET_ALL_PROFILES, doGetAllProfiles),
  takeLatest(ProfilesTypes.CREATE_PROFILE, doCreateProfiles),
  takeLatest(ProfilesTypes.EDIT_PROFILE, doEditProfiles),
  takeLatest(ProfilesTypes.DELETE_PROFILE, doDeleteProfile),
  takeLatest(ProfilesTypes.PATCH_PROFILE_STATUS, doPatchProfileStatus)
]
