import api from '../api'
import { companies } from './routes'

export const postCompany = (params) => api.post(companies.post, params)

export const putCompany = (params, id) => api.put(companies.put.replace(':id', id), params)
