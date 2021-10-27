import Snackbar from './Snackbar'

class SnackbarController {
  constructor (stack, customOptions = {}) {
    this._stack = stack
    this.customOptions = customOptions
  }

  _createSnackbar = (message, options) => new Snackbar(
    message,
    options,
    this
  )

  default = (message, options) => this._createSnackbar(
    message,
    {
      closeOnClick: true,
      ...this.customOptions,
      ...options,
      variant: 'default'
    }
  )

  success = (message, options = {}) => this._createSnackbar(
    message,
    {
      closeOnClick: true,
      ...this.customOptions,
      ...options,
      variant: 'success'
    }
  )

  warning = (message, options = {}) => this._createSnackbar(
    message,
    {
      closeOnClick: true,
      autoHideDuration: 1500,
      ...this.customOptions,
      ...options,
      variant: 'warning'
    }
  )

  error = (message, options = {}) => this._createSnackbar(
    message,
    {
      closeOnClick: true,
      ...this.customOptions,
      ...options,
      variant: 'error',
      autoHideDuration: 5000
    }
  )

  info = (message, options = {}) => this._createSnackbar(
    message,
    {
      closeOnClick: true,
      ...this.customOptions,
      ...options,
      variant: 'info'
    }
  )
}

export default SnackbarController
