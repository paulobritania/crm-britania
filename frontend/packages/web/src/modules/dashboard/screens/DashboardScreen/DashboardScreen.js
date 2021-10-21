import React, {
  useState,
  useEffect,
  useCallback
} from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'

import { MessageActions } from '@britania-crm/stores/message'
import {
  getLastMessage,
  getOneMessage
} from '@britania-crm/stores/message/message.selectors'
import MessageCard from '@britania-crm/web-components/MessageCard'
import Popup from '@britania-crm/web-components/Popup'
import PreviewMessageboard from '@britania-crm/web-components/PreviewMessageboard'

const DashboardScreen = () => {
  const dispatch = useCallback(useDispatch(), [])

  const [openPopup, setOpenPopup] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const message = useSelector(getLastMessage)
  const lastMessage = useSelector(getOneMessage)

  const getLastOneMessage = useCallback((id) => {
    dispatch(MessageActions.getOneMessage(id))
  }, [dispatch])

  // Função para carregar a lista de recados no primeiro carregamento da tela
  useEffect(() => {
    dispatch(MessageActions.getAllMessage())
  }, [dispatch])

  return (
    <>
      {
        message && (
          <MessageCard
            item={ message }
            handlePopoverOpen={ (event, id) => {
              setAnchorEl(event.currentTarget)
              setOpenPopup(true)
              getLastOneMessage(id)
            } }
          />
        )
      }
      {
        lastMessage && (
          <Popup open={ openPopup } anchorEl={ anchorEl }>
            <PreviewMessageboard
              item={ lastMessage }
              handlePopoverClose={ () => {
                setOpenPopup(false)
                setAnchorEl(null)
              } }
            />
          </Popup>
        )
      }
    </>
  )
}

export default DashboardScreen
