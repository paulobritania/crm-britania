import styled from 'styled-components'

import {
  Typography,
  Box
} from '@material-ui/core'
import MuiButton from '@material-ui/core/Button'

import colors from '@britania-crm/styles/colors'

export const MainTitle = styled(Typography).attrs({
  variant: 'h5',
  color: 'primary'
})`
  margin-bottom: 25px;
  margin: 0;
`
export const Button = styled(MuiButton)`
  color: ${ colors.britSecondary.base };
  border-color: ${ colors.britSecondary.base };
`

export const Container = styled(Box)`
  > div {
    padding-top: 24px;
    padding-bottom: 24px;
  }
`
