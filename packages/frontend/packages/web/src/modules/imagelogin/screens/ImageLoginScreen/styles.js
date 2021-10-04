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
  title: { justifyContent: 'flex-start' },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 24
  },
  cardContent: { padding: 0 },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gridGap: 10
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gridGap: 10,
    marginBottom: 24
  },
  saveChangesButton: {
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: colors.secondary.main,
    color: colors.white,
    textTransform: 'none',
    width: 208.7,
    height: 32,
    '&:hover': { backgroundColor: colors.secondary.dark },
    '&:disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
      pointerEvents: 'auto',
      backgroundColor: colors.britSupport1.base,
      '&:hover': { backgroundColor: colors.britSupport1.dark }
    }
  }
}))

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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

export const Contents = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
  max-width: 932px;
  width: 100%;
`

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`
export const Footer = styled.footer`
    display: flex;
    align-items: center;
    margin-top: 24px;
    justify-content: space-between;
`
