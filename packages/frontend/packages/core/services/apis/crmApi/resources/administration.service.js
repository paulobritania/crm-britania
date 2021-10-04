import api from '../api'
import { administration } from './routes'

// Upload login image
export const uploadFile = async (data, options) => {
  const { data: result } = await api.post(administration.uploadLoginImage, data, options)
  return result
}

export const getFile = async () => {
  const { data } = await api.get(administration.loginImage, { responseType: 'blob' })
  return data
}

export const setDefaultImage = async () => {
  const { data } = await api.delete(administration.loginImage)
  return data
}
