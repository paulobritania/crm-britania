import React, {
  useReducer,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import map from 'lodash/map'

import {
  CREATE_DIALOG,
  CLOSE_DIALOG,
  REMOVE_DIALOG,
  RESET_DIALOGS,
  DialogContext,
  dialogReducer
} from './dialogReducer'

const DialogProvider = (props) => {
  const {
    ContainerComponent,
    children = null
  } = props

  const [dialogs, dispatch] = useReducer(dialogReducer, [])

  const createDialog = (dialog) => dispatch({ type: CREATE_DIALOG, dialog })
  const removeDialog = (dialog) => {
    dispatch({ type: CLOSE_DIALOG, dialog })
    setTimeout(() => {
      dispatch({ type: REMOVE_DIALOG, dialog })
    }, 300)
  }
  const resetDialogs = () => dispatch({ type: RESET_DIALOGS })

  const state = {
    createDialog: (dialog) => createDialog(dialog),
    removeDialog: (dialog) => removeDialog(dialog),
    resetDialogs,
    dialogs
  }

  const renderedDialogs = useMemo(
    () => map(dialogs, (dialog) => {
      const {
        id,
        open,
        Component,
        props: dialogProps = {}
      } = dialog

      return (
        <Component
          key={ id }
          id={ id }
          handleClose={ () => removeDialog({ id }) }
          open={ open }
          { ...dialogProps }
        />
      )
    }),
    [dialogs]
  )

  return (
    <DialogContext.Provider value={ state }>
      {children}

      <ContainerComponent>
        {renderedDialogs}
      </ContainerComponent>
    </DialogContext.Provider>
  )
}

DialogProvider.propTypes = {
  children: PropTypes.any.isRequired,
  ContainerComponent: PropTypes.func
}

DialogProvider.defaultProps = { ContainerComponent: ({ children }) => children }

export default DialogProvider
