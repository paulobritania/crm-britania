import api from '../api'
import { auth } from './routes'

export const loginInApplication = async (login, password) => {
  const payload = {
    password,
    userName: login
  }

  const { data } = await api.post(auth.login, payload)

  return {
    accessToken: data.accessToken,
    expirationDate: data.expiresAt,
    user: data.user
  }
}
