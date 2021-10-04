import forEach from 'lodash/forEach'

import api from '../api'
import { messages } from './routes'

export const getAllMessage = async () => {
  const { data } = await api.get(messages.getFilter)
  return data
}

export const searchMessages = async (filters) => {
  const { data } = await api.get(messages.getFilter, { params: filters })
  return data
}

export const getOneMessage = async (id) => {
  const { data } = await api.get(`${ messages.getOne }/${ id }`)
  return data
}

export const updateMessage = async ({ params, id }) => {
  const formData = new FormData()
  const {
    title, content, expirationDate, homeScreen, profiles, files
  } = params

  formData.append('title', title)
  formData.append('content', content)
  formData.append('expirationDate', expirationDate)
  formData.append('homeScreen', homeScreen)
  formData.append('profiles', profiles)

  forEach(files, function (value) {
    formData.append('files', value)
  })

  return await api.patch(`${ messages.put }/${ id }`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const createMessage = async ({
  title, content, expirationDate, homeScreen, profiles, files
}) => {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('content', content)
  formData.append('expirationDate', expirationDate)
  formData.append('homeScreen', homeScreen)
  formData.append('profiles', profiles)

  forEach(files, function (value) {
    formData.append('files', value)
  })

  return await api.post(messages.post, formData, { headers: { 'Content-Type': 'application/json' } })
}

export const deleteMessage = async (id) => await api.delete(`${ messages.delete }/${ id }`)

export const deleteMessageAttachment = async (id, fileId) => await api.delete(`${ messages.deleteAttachment }/${ id }/file/${ fileId }`)
