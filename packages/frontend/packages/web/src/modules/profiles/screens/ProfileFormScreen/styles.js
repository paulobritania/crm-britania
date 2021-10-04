import hexToRgba from 'hex-to-rgba'
import styled from 'styled-components'

import GridComponent from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles(({
  btn: {
    '& button:fist-child': {
      marginBottom: 10,
      width: 332,
      height: 32,
      fontSize: 18
    },
    '& button:last-child': {
      marginBottom: 10,
      width: 362,
      height: 32,
      fontSize: 18
    }
  },
  grid: { marginTop: 20 },
  addMicroView: {
    color: colors.white,
    backgroundColor: colors.orange.base,
    '&:hover': { backgroundColor: colors.orange.base },
    '&:disabled': { backgroundColor: hexToRgba(colors.orange.base, 0.3) }
  },
  addPermissionException: {
    color: colors.white,
    backgroundColor: colors.info.main,
    '&:hover': { backgroundColor: colors.info.main },
    '&:disabled': { backgroundColor: hexToRgba(colors.info.main, 0.3) }
  }
}))

export const Grid = styled(GridComponent)`
  & .MuiButton-root + .MuiButton-root {
    margin-left: 8px;
  } 
`

export const Container = styled.div`
  background-color: ${ colors.white };
  border-radius: 25px;
  padding: 15px;
  border: 1px solid ${ colors.white };
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 30px 16px;
  font-weight: normal;

  > h1 {
    color: ${ colors.britSupport1.darkest };
    font-size: 32px;
  }
`

export const TitleItem = styled.span`
  color: ${ colors.grey3 };
  line-height: 24px;
  font-size: 16px;
  margin-bottom: 6px;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 25px;
  border-top: solid 1px ${ colors.britSupport1.light };
  margin-top: 10px;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;

    & button {
      width: 100%;
      margin-left: 5px;
    }
  }
`
