import styled from 'styled-components'

import Paper from '@material-ui/core/Paper'

import colors from '@britania-crm/styles/colors'

export const Container = styled(Paper)`
  border-radius: 25px;
  padding: 15px;
`
export const CompaniesBranch = styled(Paper)`
  margin: 5px 0px 5px;
  background-color: ${ colors.britPrimary2.lightest };
`
