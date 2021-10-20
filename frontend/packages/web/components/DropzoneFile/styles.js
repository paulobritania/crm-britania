import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import { colors } from '@britania-crm/styles'
import fonts from '@britania-crm/styles/fonts'

export default makeStyles({
  button: {
    fontFamily: fonts.fontFaceMavenPro[0].fontFamily,
    fontWeight: fonts.fontWeight.medium,
    color: colors.white,
    backgroundColor: colors.britSecondary.base,
    fontSize: 14,
    '&:hover': { backgroundColor: colors.britSecondary.dark }
  }
})

export const AddNewImage = styled.p`
  margin-bottom: 0px;
  margin-top: 0px;
  font-size: 22px;
  font-weight: 500;
  justify-content: center;
`
export const AddNewImageDesc = styled.p`
  text-align: center;
  margin-top: 0px;
  margin-bottom: 23px;
  font-size: 14px;
  color: ${ colors.primary.text };
`
export const AddButtonLabel = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  color: ${ colors.info.main };
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
