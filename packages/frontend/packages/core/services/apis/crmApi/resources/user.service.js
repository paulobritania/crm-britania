import api from '../api'
import { users } from './routes'

export const getAllUsers = async () => {
  const { data } = await api.get(users.list)
  return data
}

// ROTAS RELACIONADAS AOS SUPLENTES
export const getAllSubistitutesFromApi = async () => {
  const { data } = await api.get(users.listSubstitutes)
  return data
}

export const postUser = async (user) => {
  const { data } = await api.post(users.post, user)
  return data
}

export const putUser = async (userId, user) => {
  const { data } = await api.patch(`${ users.put }/${ userId }`, user)
  return data
}

export const deleteUser = (userId) => api.delete(`${ users.delete }/${ userId }`)

export const attachProfiles = async (userId, profiles) => {
  const { data } = await api.put(`${ users.doAttachProfiles + userId }/profiles`, profiles)
  return data
}
