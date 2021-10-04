import api from '../api'
import {
  profiles,
  permissions,
  access,
  fields
} from './routes'

// profiles
export const getAllProfilesFromApi = async () => {
  const { data } = await api.get(profiles.list)
  return data
}

export const createProfile = async (params) => await api.post(profiles.list, params)

export const updateProfile = async (id, params) => await api.put(`${ profiles.list }/${ id }`, params)

export const patchProfileStatusFromApi = async (id) => await api.patch(`${ profiles.status }/${ id }`)

export const deleteProfile = async (id) => await api.delete(`${ profiles.list }/${ id }`)

export const getProfileById = async (id) => {
  const { data } = await api.get(`${ profiles.list }/${ id }`)
  return data
}

// permissions
export const getPermissionsFromApi = async () => {
  const { data } = await api.get(`${ permissions.base }`)
  return data
}

// access
export const getAcessesFromApi = async () => {
  const { data } = await api.get(`${ access.base }`)
  return data
}

export const getFieldByAccessId = async (id) => {
  const { data } = await api.get(`${ fields.base }/${ Number(id) }`)
  return data
}
