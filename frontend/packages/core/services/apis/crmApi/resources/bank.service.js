import api from '../api'
import { banks } from './routes'

export const postBank = async (params) => await api.post(banks.post, params)

export const putBank = async (id, params) =>
  await api.put(`${banks.post}/${id}`, params)
