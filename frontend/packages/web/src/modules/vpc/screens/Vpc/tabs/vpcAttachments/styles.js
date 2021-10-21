import styled from 'styled-components'

import { Typography } from '@material-ui/core'

export const Container = styled.div`
  border-radius: 25px;
  padding: 15px;
`
export const Attach = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${ (props) => props.marginBottom ? `${ props.marginBottom }px` : '0px' }
`
export const AttachActions = styled.div`
  display: flex;
  margin-bottom: 18px;
  align-items: center;
  svg:last-child {
    margin-left:8px;
    font-size: 26px;
  }
`
export const FileName = styled(Typography)`
  display: block;
  margin-right: 8px;
  margin-left: 8px;
`
