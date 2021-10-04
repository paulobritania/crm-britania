import api from '../api'
import { documents } from './routes'

// documents
export const createDocument = async ({
  title, observation, alias, file
}) => {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('observation', observation)
  formData.append('alias', alias)
  formData.append('file', file)
  return await api.post(
    documents.post,
    formData,
    { headers: { 'Content-Type': 'application/json' } }
  )
}

export const updateDocument = async ({
  title, observation, alias, file
}) => {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('observation', observation)
  formData.append('alias', alias)
  formData.append('file', file)
  return await api.put(
    documents.put,
    formData,
    { headers: { 'Content-Type': 'application/json' } }
  )
}

export const deleteDocument = async (id) => await api.delete(`${ documents.delete }/${ id }`)
