import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

export default makeStyles({
  container: { marginTop: 10 },
  status: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  }
})

export const FlexContainer = styled.div`
display: flex;
align-items: flex-start;
grid-gap: 6px;
`

export const Info = styled.div`
margin-top: 8px;
`
