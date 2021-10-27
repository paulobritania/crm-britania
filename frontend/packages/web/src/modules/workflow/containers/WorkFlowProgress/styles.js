import styled from 'styled-components'

import MuiButton from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import colors from '@britania-crm/styles/colors'

export const Button = styled(MuiButton)`
  color: ${ colors.britSecondary.base };
  border-color: ${ colors.britSecondary.base };
`

export const Title = styled(Typography).attrs({
  variant: 'h6',
  color: 'primary'
})``
