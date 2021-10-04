import {
  createContext,
  useContext
} from 'react'

import SnackbarController from './controllers/SnackbarController'

const SnackbarContext = createContext()
const useSnackbar = () => useContext(SnackbarContext)

export {
  SnackbarController,
  SnackbarContext,
  useSnackbar
}
