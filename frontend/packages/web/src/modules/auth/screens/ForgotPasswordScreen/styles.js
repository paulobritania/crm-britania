import styled from 'styled-components'

import colors from '@britania-crm/styles/colors'
import Button from '@britania-crm/web-components/Button'

export const Container = styled.section`
  position: relative;
  text-align: center;
`

export const ForgotPasswordLink = styled(Button).attrs({ variant: 'text' })`
  margin: 20px 0;
  color: ${ colors.britSecondary.base };
  text-decoration: underline;
  &:hover {
    color: ${ colors.britSecondary.base };
  }
`

export const ForgotPasswordButton = styled(Button)`
  width: 100%;
  margin-top: 50px;
  padding: 0 8px;
  background-color: ${ colors.info.main };
  &:hover {
    background-color: ${ colors.info.main };
  }
`
