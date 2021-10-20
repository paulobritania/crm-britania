import upperFirst from 'lodash/upperFirst'

class Snackbar {
  constructor (message, options = {}, controller = {}) {
    this.controller = controller
    this.message = typeof message === 'string' ? upperFirst(message) : message
    this.options = options
    this.key = undefined

    this.open()
  }

  open = () => {
    const {
      closeOnClick,
      onClick = () => {},
      ...otherOptions
    } = this.options

    let options = {}

    if (closeOnClick) {
      options = {
        onClick: () => {
          onClick(this.key)
          this.close()
        }
      }
    }

    // default options for every snackbar
    const snackbarOptions = {
      autoHideDuration: 300,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      ...otherOptions,
      ...options
    }

    this.key = this.controller._stack.openSnackbar(this.message, snackbarOptions)
  }

  close = () => {
    this.controller._stack.closeSnackbar(this.key)
  }
}

export default Snackbar
