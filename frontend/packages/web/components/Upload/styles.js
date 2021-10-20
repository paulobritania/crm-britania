import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles({
  root: {
    '& .MuiPaper-rounded': { borderRadius: 25 },
    '& .MuiDialogTitle-root': { padding: 0 },
    '& .MuiFormControlLabel-root': {
      marginLeft: 0,
      marginBottom: 32
    }
  }
})

export const Preview = styled.div.attrs(({
  src, style, ...props
}) => ({
  style: { backgroundImage: `url('${ src }')`, style },
  ...props
}))`
  width: 100%;
  height: 100%;
  border-radius: 16px;  
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  min-height: 281px;
`

export const LeftBox = styled.div`
  display: flex;
  background-color: #fff;
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
export const CenteredBox = styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  width: 100%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 5px 15px -4px;
  min-height: 281px;
  max-height: 281px;
  min-width: 562px;
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
export const ShadowBox = styled.div`
  background-color: ${ colors.britPrimary2.lightest };
  margin: 32;
  width: 100%;
  height: 100%;
  padding: 24px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: none;
`

export const ContentBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: -10px;
`
