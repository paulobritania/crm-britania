import React, {
  memo,
  useEffect
} from 'react'

import { useDialog } from '@britania-crm/dialog'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import RouterSwitch from './RouterSwitch'

const AuthenticatedScreenRouter = (props) => {
  const { routes } = useRoutes()
  const { resetDialogs } = useDialog()

  useEffect(() => {
    resetDialogs()
  }, [resetDialogs])

  return (
    <RouterSwitch
      routes={ routes }
      escapeTo={ routes.home.path }
      { ...props }
    />
  )
}

export default memo(AuthenticatedScreenRouter)
