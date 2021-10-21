import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import PersonIcon from '@material-ui/icons/Person'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import ElevatedButton from '@britania-crm/web-components/ElevatedButton'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import LoginImageUploadModal from '../../modals/LoginImageUploadModal/LoginImageUploadModal'
import {
  Contents,
  PageWrapper
} from './styled'

const AdministrationScreen = () => {
  const { routes } = useRoutes()
  const history = useHistory()
  const t = useT()
  const { createDialog } = useDialog()

  const handleOpenImageLogin = useCallback(() => {
    createDialog({
      id: 'imageLogin',
      Component: LoginImageUploadModal
    })
  }, [createDialog])

  return (
    <PageWrapper>
      <Contents>
        <ElevatedButton icon={ ImageOutlinedIcon } label={ t('login image') } onPress={ handleOpenImageLogin } />
        <ElevatedButton icon={ PersonIcon } label={ t('user control', { howMany: 1 }) } onPress={ () => history.push(routes.users.path) } />
        <ElevatedButton icon={ AssignmentIndIcon } label={ t('profiles control') } onPress={ () => history.push(routes.profiles.path) } />
        <ElevatedButton icon={ AssignmentIndIcon } label={ t('workflow panel') } onPress={ () => history.push(routes.workflowPanel.path) } />
        <ElevatedButton icon={ AssignmentIndIcon } label={ t('message boards') } onPress={ () => history.push(routes.messageboard.path) } />
      </Contents>
    </PageWrapper>
  )
}

export default AdministrationScreen
