import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  addAlert: ['newAlert'],
  removeAlert: ['alertId'],
  removeExpiredAlerts: [],

  closeReminder: ['reminderId'],
  changeDragStatusRememberContainer: ['disableDrag'], // Desabilita/habilita a ação de mover o lembrate
  createNewReminderRequest: [],
  createNewReminderSuccess: ['reminderCreated'], // Cria uma nova janela de lembrete
  getAllReminders: [],
  minimizeReminder: ['reminderId', 'minimize'],
  saveReminder: ['reminderId', 'content'],
  selectReminderToTopLayer: ['reminderId'], // Faz com que o lembrate que tem o id igual a reminderId, fique por cima dos outros
  setAllReminders: ['reminders'],
  downloadFile: ['url', 'filename']
})

export {
  Types as AppTypes,
  Creators as AppActions
}
