import api from '../api'
import { vpc } from './routes'

export const postVpc = async (params) => await api.post(vpc.create, params)

export const putVpc = async (id, params) => await api.put(vpc.update.replace(':vpcId', id), params)

export const startWorkflowVpc = async (id) => await api.put(vpc.startWorkflowVpc.replace(':vpcId', id))
