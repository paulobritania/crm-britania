import styled from 'styled-components'

import GridComponent from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles({
  buttons: {
    margin: 5,
    '& span > button': {
      width: '100%',
      marginLeft: 10
    }
  }
})

export const Grid = styled(GridComponent)`
  & + .MuiGrid-container {
    margin-top: 20px !important;
  }

  & .MuiButton-root + .MuiButton-root {
    margin-left: 8px;
  } 

  & .MuiGrid-item + .MuiGrid-item {
    margin-left: auto;
  }
`

export const BindContainer = styled.div`
  background: #f8f9fa;
  width: 100%;
  min-height: 400px;
  margin: 0px 0px 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`
