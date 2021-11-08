import api from '../api'
import { companies } from './routes'

export const postCompany = (params) => api.post(companies.post, params)

export const putCompany = (params, id) =>
  api.put(companies.put.replace(':id', id), params)

export const postCompanyBank = async (params) =>
  await api.post(companies.postBank, params)

export const putCompanyBank = async (id, params) =>
  await api.put(`${companies.putBank}/${id}`, params)
