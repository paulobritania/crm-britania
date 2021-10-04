import api from '../api'
import {
  reminders,
  file
} from './routes'

export const getRemindersFromApi = async () => {
  const { data } = await api.get(reminders.stickyNotes)
  return data
}

export const deleteReminder = async ({ reminderId }) => {
  const { data } = await api.delete(`${ reminders.stickyNotes }/${ Number(reminderId) }`)
  return data
}

export const updateReminder = async (reminderId, content) => {
  const { data } = await api.put(`${ reminders.stickyNotes }/${ Number(reminderId) }`, { content })
  return data
}

export const createReminder = async ({ content }) => {
  const { data } = await api.post(`${ reminders.stickyNotes }`, { content })
  return data
}

export const download = async (url) => {
  const { data } = await api.get(`${ file.download }/${ url }`, { responseType: 'blob' })
  return data
}
