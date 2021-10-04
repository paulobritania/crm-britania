import React from 'react'

import I18n from '@britania-crm/i18n'
import {
  ScreenContainer,
  HeaderContainer,
  MainTitle,
  SubTitle
} from '@britania-crm/web-src/layouts/GuestLayout/styled'
import LoginForm from '@britania-crm/web-src/modules/auth/forms/LoginForm'

const LoginScreen = () => (
  <ScreenContainer>
    <HeaderContainer>
      <I18n as={ MainTitle }>welcome</I18n>
      <I18n as={ SubTitle }>log in</I18n>
    </HeaderContainer>

    <LoginForm />
  </ScreenContainer>
)

export default LoginScreen
