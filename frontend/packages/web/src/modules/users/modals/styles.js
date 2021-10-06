import styled from 'styled-components'

import GridComponent from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles(({
  linkButton: {
    color: colors.britSecondary.base,
    borderColor: colors.britSecondary.base
  }
}))

export const Grid = styled(GridComponent)``

export const BindContainer = styled.div`
  background: #f8f9fa;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 25px;

  > div:nth-child(1) {
    width: 100%;
  }
`

export const ActionsAndImage = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  > div {
    display: flex;
    align-items: center;

    > span {
      padding: 8px;
      display: flex;
    }
  }

  > img {
    object-fit: cover;
    width: 355px;
    height: 275px;
    border-radius: 24px;
    margin-top: 8px;
  }
`
export const ImgContainer = styled.div`
  border-radius: 25px;
`
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 50%;
`
