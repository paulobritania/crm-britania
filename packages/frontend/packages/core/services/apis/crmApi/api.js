import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

window.setApiUrl = (url = process.env.REACT_APP_API_URL) => {
  api.defaults.baseURL = url
}

export default api
