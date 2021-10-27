import React, {
  memo,
  useRef,
  useState,
  useCallback
} from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import { Rnd as ReminderContainerDraggable } from 'react-rnd'

import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'

import ClearIcon from '@material-ui/icons/Clear'
import MinimizeIcon from '@material-ui/icons/Minimize'

import { AppActions } from '@britania-crm/stores/app'
import {
  selectRemindersCount,
  selectDisableDrag
} from '@britania-crm/stores/app/app.selectors'

import {
  HeaderContainer,
  InputContainer
} from './styled'

const Reminder = ({
  show, reminder, handleMinimize, handleClose
}) => {
  const dispatch = useDispatch()

  const textAreaRef = useRef(null)

  const [positions, setPositions] = useState({ x: 40, y: 60 })

  const quantityReminders = useSelector(selectRemindersCount)
  const disableDrag = useSelector(selectDisableDrag)

  const MIN_Z_INDEX_VALUE = 1700
  const WIDTH_DEFAULT = 360
  const HEIGHT_DEFAULT = 280

  const saveReminderText = useCallback(
    debounce(
      ({ content, reminderId }) => {
        dispatch(AppActions.saveReminder(content, reminderId))
      },
      500
    ),
    []
  )

  return (
    <ReminderContainerDraggable
      style={ {
        position: 'absolute',
        zIndex: reminder.topLayer
          ? (quantityReminders + MIN_Z_INDEX_VALUE)
          : MIN_Z_INDEX_VALUE,
        borderRadius: '25px',
        visibility: show ? 'visible' : 'hidden',
        boxShadow: '16px 36px 16px 16px rgba(0, 0, 0, 0.1)'
      } }
      onDragStop={ (event, d) => setPositions({ x: d.x, y: d.y < -80 ? -60 : d.y }) }
      enableResizing={ false }
      disableDragging={ disableDrag }
      position={ { x: positions.x, y: positions.y } }
      size={ { width: WIDTH_DEFAULT, height: HEIGHT_DEFAULT } }
      onMouseDown={ (event) => {
        event.stopPropagation()
        /**
         * Faz com que esse lembrate fique por cima de todos os outros.
         */
        dispatch(AppActions.selectReminderToTopLayer(reminder.id))
      } }
    >
      <HeaderContainer onMouseOver={ () => dispatch(AppActions.changeDragStatusRememberContainer(false)) }>
        <span>Lembrete #{reminder.id}</span>

        <div>
          <button type="button" onClick={ () => handleMinimize({ reminderId: reminder.id, minimize: true }) }>
            <MinimizeIcon />
          </button>
          <button type="button" onClick={ (event) => handleClose(event, reminder.id) }>
            <ClearIcon />
          </button>
        </div>
      </HeaderContainer>

      <InputContainer onMouseOver={ () => dispatch(AppActions.changeDragStatusRememberContainer(false)) }>
        <textarea
          onMouseOver={ (event) => {
            event.stopPropagation()
            dispatch(AppActions.changeDragStatusRememberContainer(true))
          } }
          ref={ textAreaRef }
          name="reminderText"
          rows="12"
          maxLength="4000"
          defaultValue={ reminder.content }
          onKeyUp={ () =>
            saveReminderText({
              content: textAreaRef.current.value,
              reminderId: reminder.id
            }) }
        />
      </InputContainer>
    </ReminderContainerDraggable>
  )
}

Reminder.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleMinimize: PropTypes.func.isRequired,
  reminder: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}

export default memo(Reminder)
