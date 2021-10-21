import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export const useStyles = makeStyles(() => ({
  phoneInput: { alignSelf: 'start' },
  btnLinkProfile: {
    '& button': {
      width: 300,
      height: 32
    }
  }
}))

export const InfoContainer = styled.div`
  margin-top: 10px;
  font-size: 14px;
  display: flex;
  align-content: center;
  justify-content: center;

  & > svg {
    margin-right: 20px;
  }
`
export const ShadowBox = styled.div`
  display: flex;
  background-color: ${colors.white5};
  margin: 32;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding: 32px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  box-shadow: none;
`
export const LeftBox = styled.div`
  display: flex;
  background-color: ${colors.white};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  margin-right: 16px;
  width: 80%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 5px 15px -4px;
  min-height: 281px;
  max-height: 281px;
  text-align: center;
`

export const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  width: 100%;
  height: 100%;
  min-height: 281px;
  max-height: 281px;
`
export const ContentBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`
