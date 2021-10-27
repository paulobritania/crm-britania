import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

const useStyles = makeStyles((theme) => ({
  formControl: {
    '& .MuiOutlinedInput-root ': {
      width: 150,
      color: colors.white,
      backgroundColor: colors.primary.main,
      border: 'none',
      '&:hover': {
        backgroundColor: colors.britPrimary1.light,
        border: 'none'
      },
      '&:focus-within': {
        backgroundColor: colors.primary.main,
        border: 'none'
      }
    },
    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '& .Mui-disabled': { color: colors.white },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '& .MuiInputLabel-outlined': { transform: 'translate(1px, 12px) scale(1)' }
  },
  selectRoot: {
    // color: colors.white,
    border: 'none'
  },
  icon: { color: colors.white },
  selectPaper: {
    '& .MuiMenu-list': { height: '105px' },
    backgroundColor: theme.palette.primary.light,
    border: 'none',
    color: colors.white,
    '& li': { borderBottom: `1px solid ${ colors.white }` },
    '& li:hover': {
      backgroundColor: `${ colors.primary.light }`,
      opacity: 0.6,
      cursor: 'pointer'
    },
    height: 170,
    top: '119px !important'
  },
  label: {
    color: colors.white,
    fontSize: 14
  }
}))

export default useStyles
