import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export const useStyles = makeStyles({
  root: { '& .MuiPaper-rounded': { borderRadius: 25 } },
  '& .MuiDialogActions-root': {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogContent: {
    textAlign: 'center',
    textJustify: 'inter-word',
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    minWidth: '478px',
    maxWidth: 1000,
    padding: '12px 24px',
    width: '100%',
    minHeight: '246px',
    overflowX: 'hidden'
  },
  dialogTitle: {
    display: 'flex',
    paddingTop: 0,
    paddingRight: 0,
    '& h2': {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom: 0,
      fontSize: 32,
      color: colors.britPrimary1.base,
      fontWeight: '500'
    }
  },
  circleButtonLeft: {
    '&.MuiButton-root': {
      justifyContent: 'center',
      borderRadius: 40,
      backgroundColor: '#66E77F',
      color: colors.white
    },
    textTransform: 'none',
    minWidth: 118.53
  },
  circleButtonRight: {
    '&.MuiButton-root': {
      justifyContent: 'center',
      borderRadius: 40,
      backgroundColor: colors.white,
      color: colors.error.main
    },
    '&.MuiButton-outlinedPrimary': { border: `2px solid ${ colors.error.main }` },
    textTransform: 'none',
    minWidth: 118.53
  },
  closeButton: {
    alignSelf: 'flex-end',
    cursor: 'pointer',
    margin: 10,
    width: 22,
    '& svg': { fontSize: 18 }
  }
})
