import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

export default makeStyles({
  input: { display: 'none' },
  chip: { border: 'none' },
  labelChip: { maxWidth: '100%' }
})

export const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 5px;
`
