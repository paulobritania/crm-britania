import styled from 'styled-components'

import Typography from '@material-ui/core/Typography'

import colors from '@britania-crm/styles/colors'
import Button from '@britania-crm/web-components/Button'

export const LoginButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`

export const LoginLabelForgotPassword = styled(Typography).attrs({ variant: 'body2' })`
  margin: 5px 0 20px 16px;
  color: ${ colors.secondary.main };
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: ${ colors.secondary.dark }
  }
`
