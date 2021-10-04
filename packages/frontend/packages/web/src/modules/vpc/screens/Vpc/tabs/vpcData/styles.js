import styled from 'styled-components'

import Box from '@material-ui/core/Box'

export const Container = styled.div`
  border-radius: 25px;
  padding: 15px;
`
export const Info = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  width: 100%;

  @media(min-width: 960px) {
    justify-content: flex-end;
  }
  div {
    display: flex;
    height: fit-content;
  }
  p {
    margin-left: 7px;
  }
`
export const Footer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 28px;
`
export const Label = styled.span`
font-size: 12px;
margin-bottom: -8px;
`

export const FlexContainer = styled.div`
display: flex;
flex-direction:column
`
