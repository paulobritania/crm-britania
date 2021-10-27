import axios from 'axios'

import { trimMask } from '@britania-crm/utils/formatters'

const api = axios.create({ baseURL: 'https://brasilapi.com.br/api/cep/v1/' })

const searchCep = async (cep) => {
  try {
    const { data } = await api.get(trimMask(cep))
    return data
  } catch (error) {
    throw new Error(error?.response?.data?.message)
  }
}

export { searchCep }

export default api
