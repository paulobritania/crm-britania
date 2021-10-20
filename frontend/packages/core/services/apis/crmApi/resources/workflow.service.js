import api from '../api'
import { workflows } from './routes'

export const getAllWorkflows = async (params) => {
  const { data } = await api.get(workflows.getAll, { params })
  return data
}

export const getOneWorkflow = async (id) => {
  const { data } = await api.get(`${ workflows.getOne }/${ id }`)
  return data
}

export const getWorkflowTypes = async () => {
  const { data } = await api.get(workflows.getTypes)
  return data
}

export const createWorkflow = async (params) => {
  const { status } = await api.post(workflows.create, params)
  return status
}

export const updateWorkflow = async (params, id) => {
  const { data } = await api.put(`${ workflows.update }/${ id }`, params)
  return data
}

export const deactivateWorkflow = async (id) => {
  const { data } = await api.put(`${ workflows.deactivate }/${ id }/deactivate`)
  return data
}
