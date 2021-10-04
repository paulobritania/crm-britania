import api from '../api'
import { fields } from './routes'

export const getFields = async (id) => {
  const { data } = await api.get(`${ fields.get }/${ id }`)

  return data
}
