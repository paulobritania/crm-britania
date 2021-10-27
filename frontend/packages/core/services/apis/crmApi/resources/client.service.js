import api from '../api'
import { clients } from './routes'

export const getClients = async (params) => {
  const { data } = await api.get(clients.get, { params })
  return data
}
