import api from '../api'
import { file } from './routes'

export const deleteFile = async (id) => await api.delete(`${ file.delete }/${ id }`)

export const getFileById = async (id) => {
  const { data } = await api.get(`${ file.getById }/${ id }`, { responseType: 'blob' })
  return data
}

export const uploadSingleFile = async (data, options) => {
  const { data: result } = await api.post(file.uploadSingleFile, data, options)
  return result
}

export const downloadFile = async (url) => {
  const { data } = await api.get(url, { responseType: 'blob' })
  return data
}
