import api from '../api'
import {
  customer,
  clients
} from './routes'

export const getOne = async (id) => {
  const { data } = await api.get(`${ customer.getOne }/${ id }`)
  return data
}

export const putRankingChangeRanking = async (params, id) => {
  const url = clients.getPutUrlRankingChangeRanking.replace(':clientTotvsCode', id)
  return await api.put(url, params)
}

export const updateCustomer = async (params, id) => await api.put(`${ customer.put }/${ id }`, params)

export const postCustomerPreRegistry = async (params) => api.post(customer.postPreRegister, params)

export const putCustomerPreRegistry = async (params, id) => api.put(customer.putPreRegister.replace(':id', id), params)

export const putFinishCustomerPreRegistry = async (params, id) => api.put(customer.putFinishPreRegister.replace(':id', id), params)
