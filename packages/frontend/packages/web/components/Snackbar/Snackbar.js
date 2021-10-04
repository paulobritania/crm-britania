import React from 'react'

import {
  SnackbarProvider as NotistackProvider,
  withSnackbar
} from 'notistack'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import {
  SnackbarController,
  SnackbarContext
} from '@britania-crm/snackbar'

import styles from './styles'

export const SnackbarsProvider = (props) => {
  const {
    children, options, anchorOrigin, ...rest
  } = props

  const Component = withSnackbar((notistack) => {
    const snackbarController = new SnackbarController(
      {
        openSnackbar: notistack.enqueueSnackbar,
        closeSnackbar: notistack.closeSnackbar
      },
      {
        anchorOrigin,
        ...options
      }
    )

    return (
      <SnackbarContext.Provider value={ snackbarController }>
        {children}
      </SnackbarContext.Provider>
    )
  })

  const Result = withStyles(styles)((styleProps) => (
    <NotistackProvider
      { ...rest }
      { ...styleProps }
    >
      <Component />
    </NotistackProvider>
  ))

  return <Result />
}

SnackbarsProvider.propTypes = {
  /** maximum number of snackbars appearing simultaneously */
  maxSnack: PropTypes.number,
  /** snackbars position */
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'bottom']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right'])
  }),
  /** default options to all snackbars */
  options: PropTypes.shape({
    persist: PropTypes.bool,
    autoHideDuration: PropTypes.number,
    variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info'])
  }),
  children: PropTypes.any
}

SnackbarsProvider.defaultProps = {
  maxSnack: 5,
  options: {},
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right'
  },
  children: null
}
