import axios from 'axios'

import orderBy from 'lodash/orderBy'

const api = axios.create({ baseURL: 'https://servicodados.ibge.gov.br/api/v1/' })

const searchStates = async () => {
  try {
    const { data } = await api.get('localidades/estados')
    return orderBy(data, 'sigla', 'asc')
  } catch (error) {
    throw new Error(error?.response?.data?.message)
  }
}

const searchCities = async (state) => {
  try {
    const { data } = await api.get(`localidades/estados/${ state }/municipios`)
    return data
  } catch (error) {
    throw new Error(error?.response?.data?.message)
  }
}

export {
  searchStates,
  searchCities
}

export default api
