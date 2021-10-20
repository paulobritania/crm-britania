import React, {
  useEffect,
  useCallback,
  useMemo
} from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'

import { Alert } from '@material-ui/lab'

import { AppActions } from '@britania-crm/stores/app'
import { selectAlerts } from '@britania-crm/stores/app/app.selectors'

import useStyles, { Container } from './styles'

let timer = null

const AlertList = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const alerts = useSelector(selectAlerts)

  const lastMessageIndex = useMemo(
    () => alerts.length - 1,
    [alerts.length]
  )

  const lastAlert = useMemo(
    () => alerts[lastMessageIndex],
    [alerts, lastMessageIndex]
  )

  const closeAlert = useCallback(
    (id) => dispatch(AppActions.removeAlert(id)),
    [dispatch]
  )

  // Limpar contador na fase de desmontagem do componente
  useEffect(() => () => timer && clearTimeout(timer), [])

  useEffect(() => {
    if (lastMessageIndex >= 0) {
      timer = setTimeout(() => closeAlert(lastAlert.id), 3000)
    }
  }, [alerts]) // eslint-disable-line

  return (
    <Container>
      {lastMessageIndex >= 0 && alerts[lastMessageIndex].expiredAt >= (new Date().getTime()) && (
        <Alert
          key={ lastAlert.id }
          severity={ lastAlert.type }
          onClose={ () => closeAlert(lastAlert.id) }
          className={ classes.alert }
        >
          {lastAlert.message}
        </Alert>
      )}
    </Container>
  )
}

export default AlertList
