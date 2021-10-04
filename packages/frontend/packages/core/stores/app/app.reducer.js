import { createReducer } from 'reduxsauce'

import { AppTypes } from './app.actions'

const INITIAL_STATE = {
  alerts: [],
  disableDrag: false,
  reminders: []
}

const addAlert = (state = INITIAL_STATE, { newAlert }) => ({
  ...state,
  alerts: [
    ...state.alerts,
    {
      id: (new Date()).getTime(),
      expiredAt: (new Date()).getTime() + (3 * 1000),
      ...newAlert
    }
  ]
})

const removeAlert = (state = INITIAL_STATE, { alertId }) => ({
  ...state,
  alerts: state.alerts.filter((item) => item.id !== alertId)
})

const removeExpiredAlerts = (state = INITIAL_STATE) => ({
  ...state,
  alerts: state.alerts.filter(
    (item) => item.expiredAt <= ((new Date()).getTime() + (3 * 1000))
  )
})

const closeReminder = (state = INITIAL_STATE, { reminderId }) => ({
  ...state,
  reminders: state.reminders.filter((reminder) => reminder.id !== reminderId)
})

const changeDragStatusRememberContainer = (state = INITIAL_STATE, { disableDrag }) => ({
  ...state,
  disableDrag
})

const createNewReminderSuccess = (state = INITIAL_STATE, { reminderCreated }) => ({
  ...state,
  reminders: [
    ...state.reminders.map((reminder) => (
      reminder.topLayer
        ? { ...reminder, topLayer: false }
        : reminder
    )),
    {
      ...reminderCreated,
      topLayer: true,
      showContent: true
    }
  ]
})

const minimizeReminder = (state = INITIAL_STATE, { reminderId, minimize }) => ({
  ...state,
  reminders: state.reminders.map((reminder) => (
    reminder.id === reminderId
      ? {
        ...reminder, showContent: !minimize, topLayer: true
      }
      : { ...reminder, topLayer: false }
  ))
})

const saveReminder = (state = INITIAL_STATE, { reminderId, content }) => ({
  ...state,
  reminders: state.reminders.map((reminder) => (
    reminder.id === reminderId
      ? { ...reminder, content }
      : reminder
  ))
})

const selectReminderToTopLayer = (state = INITIAL_STATE, { reminderId }) => ({
  ...state,
  disableDragging: false,
  reminders: state.reminders.map((reminder) => (
    reminder.id === reminderId
      ? { ...reminder, topLayer: true }
      : { ...reminder, topLayer: false }
  ))
})

const setAllReminders = (state = INITIAL_STATE, { reminders }) => ({
  ...state,
  reminders: reminders.map((reminder) => ({
    ...reminder,
    showContent: false,
    topLayer: false
  }))
})

export default createReducer(INITIAL_STATE, {
  [AppTypes.ADD_ALERT]: addAlert,
  [AppTypes.REMOVE_ALERT]: removeAlert,
  [AppTypes.REMOVE_EXPIRED_ALERTS]: removeExpiredAlerts,

  [AppTypes.CLOSE_REMINDER]: closeReminder,
  [AppTypes.CHANGE_DRAG_STATUS_REMEMBER_CONTAINER]: changeDragStatusRememberContainer,
  [AppTypes.CREATE_NEW_REMINDER_SUCCESS]: createNewReminderSuccess,
  [AppTypes.MINIMIZE_REMINDER]: minimizeReminder,
  [AppTypes.SAVE_REMINDER]: saveReminder,
  [AppTypes.SELECT_REMINDER_TO_TOP_LAYER]: selectReminderToTopLayer,
  [AppTypes.SET_ALL_REMINDERS]: setAllReminders
})
