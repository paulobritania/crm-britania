import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({
  ranking: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  documentation: { marginTop: 10 }
}))

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 50%;
`
export const PdfContainer = styled.div`
  width: 100%;
  height: 70vh;
`
