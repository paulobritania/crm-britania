import styled from 'styled-components'

import Typography from '@material-ui/core/Typography'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const HeaderContainer = styled.div`
  margin-bottom: 50px;
`

export const MainTitle = styled(Typography).attrs({
  variant: 'h4',
  align: 'center'
})`
  color: ${ colors.secondary.main };
  text-transform: uppercase;
  font-weight: ${ fonts.fontWeight.black };
`

export const SubTitle = styled(Typography).attrs({
  variant: 'h6',
  align: 'center'
})`
  margin-top: 10px;
  color: ${ colors.primary.main };
  font-weight: ${ fonts.fontWeight.light };
  line-height: 1em;
`
