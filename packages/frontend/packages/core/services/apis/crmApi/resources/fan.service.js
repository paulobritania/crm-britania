import api from '../api'
import { fan } from './routes'

export const saveFan = async (params) => await api.post(fan.save, params)

export const concludeFan = async (id) => await api.put(fan.conclude.replace(':workflowFanId', id))

export const putFan = async (workflowFanId, params) => await api.put(fan.put.replace(':workflowFanId', workflowFanId), params)

export const saveDocuments = async (workflowFanId, params) => await api.post(fan.saveDocuments.replace(':workflowFanId', workflowFanId), params)

export const deleteDocument = async (id) => await api.delete(fan.deleteDocument.replace(':documentId', id))
