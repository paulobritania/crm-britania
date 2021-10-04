import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControlLabel-root': {
      marginLeft: 0,
      marginBottom: 32
    }
  },
  saveChangesButton: {
    '&.MuiButton-root': {
      justifyContent: 'center',
      borderRadius: 40,
      backgroundColor: colors.secondary.main,
      color: colors.white
    },
    textTransform: 'none',
    width: 208.7,
    height: 32,
    '&.Mui-disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
      pointerEvents: 'auto'
    },
    '&.Mui-disabled:hover': { background: colors.secondary.light }
  }
}))

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const InfoContainer = styled.div`
  margin-top: 10px;
  font-size: 14px;
  display: flex;
  align-content: center;
  justify-content: center;

  & > svg {
    margin-right:20px
  }
`
