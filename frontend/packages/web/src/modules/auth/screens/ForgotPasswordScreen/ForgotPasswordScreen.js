import React from 'react'
import { Link } from 'react-router-dom'

import EntryIcon from '@britania-crm/web-components/Icons/EntryIcon'
import {
  ScreenContainer,
  HeaderContainer,
  MainTitle,
  SubTitle
} from '@britania-crm/web-src/layouts/GuestLayout/styled'
import { useRoutes } from '@britania-crm/web-src/routes/guest.routes'

import {
  ForgotPasswordButton,
  ForgotPasswordLink,
  Container
} from './styles'

const ForgotPassword = () => {
  const { routes } = useRoutes()

  return (
    <ScreenContainer>
      <HeaderContainer>
        <MainTitle>Esqueceu a Senha?</MainTitle>
      </HeaderContainer>

      <Container>
        <SubTitle>Para recuperação de senha do sistema, utilize o portal SGA</SubTitle>

        <ForgotPasswordLink
          href="https://portalsga.britania.com.br/"
          target="_blank"
        >
            https://portalsga.britania.com.br/
        </ForgotPasswordLink>

        <SubTitle>
          Caso encontre dificuldades, entre em contato com a TI!
        </SubTitle>

        <Link to={ routes.login.path }>
          <ForgotPasswordButton
            variant="contained"
            color="primary"
            startIcon={ <EntryIcon /> }
          >
            Voltar para o Login
          </ForgotPasswordButton>
        </Link>
      </Container>

    </ScreenContainer>
  )
}

export default ForgotPassword
