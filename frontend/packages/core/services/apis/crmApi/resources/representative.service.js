import api from '../api'
import { representative } from './routes'

export const saveRepresentative = async (data) => await api.post(representative.postSave, data)

export const concludeRepresentative = async (data) => await api.post(representative.postConclude, data)

export const updateRepresentative = async (id, data) => await api.put(`${ representative.put }/${ id }`, data)
