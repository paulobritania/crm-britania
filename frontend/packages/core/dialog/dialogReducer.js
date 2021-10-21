import {
  createContext,
  useContext,
  useCallback
} from 'react'

import filter from 'lodash/filter'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'

export const CREATE_DIALOG = 'CREATE_DIALOG'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'
export const REMOVE_DIALOG = 'REMOVE_DIALOG'
export const RESET_DIALOGS = 'RESET_DIALOGS'

export const DialogContext = createContext()
export const useDialog = () => useCallback(useContext(DialogContext), [])

export const dialogReducer = (dialogs = [], action = {}) => {
  switch (action.type) {
    case CREATE_DIALOG:
      return uniqBy([
        ...dialogs,
        {
          ...action.dialog,
          open: true
        }
      ], 'id')

    case CLOSE_DIALOG:
      return map(dialogs, (dialog) => {
        if (dialog.id === action.dialog.id) {
          return { ...dialog, open: false }
        }
        return dialog
      })

    case REMOVE_DIALOG:
      return filter(dialogs, (dialog) => dialog.id !== action.dialog.id)

    case RESET_DIALOGS:
      return []

    default:
      return dialogs
  }
}
