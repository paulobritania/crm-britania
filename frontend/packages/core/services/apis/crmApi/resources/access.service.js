import api from '../api'
import { access } from './routes'

export const getAllAccesses = async () => {
  const { data } = await api.get(access.getAll)
  return data
}
