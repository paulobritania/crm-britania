import hexToRgba from 'hex-to-rgba'
import styled from 'styled-components'

import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

import colors from '@britania-crm/styles/colors'

export const Container = styled(Grid).attrs({ container: true })`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  background: ${ colors.white };
`

export const Banner = styled.div`
  flex: 1;
  width: calc(100% + 48px);
  height: 100%;
  background-image: ${ ({ bgImage }) => `url('${ bgImage }')` };
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

   ${ ({ theme }) => `
    ${ theme.breakpoints.down('sm') } {
      width: 100%;
    }
  ` }
`

export const Border = styled.div`
  background-color: ${ colors.britSupport1.base };
  width: 8px;
  height: 80%;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
`

export const Content = styled.div`
  display: flex; 
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0 10%;
`

export const Box = styled(Card).attrs({ raised: true })`
  display: flex; 
  align-items: center;
  height: 100%;
  width: 100%;
  background: ${ colors.white };
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  /* box-shadow: 0 0 32px ${ hexToRgba(colors.black, 0.5) }; */
  ${ ({ theme }) => `
    ${ theme.breakpoints.down('sm') } {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  ` }
`
