import React, {
  memo,
  useCallback,
  useEffect
} from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'

import ClearIcon from '@material-ui/icons/Clear'

import { AppActions } from '@britania-crm/stores/app'
import { ReminderIcon } from '@britania-crm/web-components/Icons'

import Reminder from './Reminder'
import {
  Tab,
  Container,
  Wrapper
} from './styled'

const Tabs = () => {
  const dispatch = useDispatch()
  const remindersData = useSelector((state) => state.app.reminders)

  useEffect(() => {
    dispatch(AppActions.getAllReminders())
  }, [dispatch])

  const handleClose = useCallback((event, reminderId) => {
    event.stopPropagation()
    dispatch(AppActions.closeReminder(reminderId))
  }, [dispatch])

  const handleMinimize = useCallback(({ reminderId, minimize }) => {
    dispatch(AppActions.minimizeReminder(reminderId, minimize))
  }, [dispatch])

  return (
    <Container>
      {remindersData.map((reminder) =>
        <Wrapper key={ String(reminder.id) }>
          <Tab
            show={ !reminder.showContent }
            onClick={ () => handleMinimize({ reminderId: reminder.id, minimize: false }) }
          >
            <div>
              <ReminderIcon />
              <span>Lem. #{reminder.id}</span>
            </div>

            <button type="button" onClick={ (event) => handleClose(event, reminder.id) }>
              <ClearIcon />
            </button>
          </Tab>

          <Reminder
            reminder={ reminder }
            show={ reminder.showContent }
            handleMinimize={ handleMinimize }
            handleClose={ handleClose }
          />
        </Wrapper>
      )}
    </Container>
  )
}

export default memo(Tabs)
