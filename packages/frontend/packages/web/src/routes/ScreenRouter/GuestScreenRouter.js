import React, {
  memo,
  useEffect
} from 'react'

import { useDialog } from '@britania-crm/dialog'
import { useRoutes } from '@britania-crm/web-src/routes/guest.routes'

import RouterSwitch from './RouterSwitch'

const GuestScreenRouter = (props) => {
  const { routes } = useRoutes()
  const { resetDialogs } = useDialog()

  useEffect(() => {
    resetDialogs()
  }, [resetDialogs])

  return <RouterSwitch routes={ routes } { ...props } />
}

export default memo(GuestScreenRouter)
