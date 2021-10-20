import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import { colors } from '@britania-crm/styles'
import fonts from '@britania-crm/styles/fonts'

export default makeStyles({
  root: {
    '& .MuiPaper-rounded': { borderRadius: 25 },
    '& .MuiDialogTitle-root': { padding: 0 },
    '& .MuiFormControlLabel-root': {
      marginLeft: 0,
      marginBottom: 32
    }
  },
  button: {
    fontFamily: fonts.fontFaceMavenPro[0].fontFamily,
    fontWeight: fonts.fontWeight.medium,
    color: colors.white,
    backgroundColor: colors.britSecondary.base,
    fontSize: 14,
    '&:hover': { backgroundColor: colors.britSecondary.dark }
  },
  preview: { marginTop: 10 }
})

export const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: -10px;
`
