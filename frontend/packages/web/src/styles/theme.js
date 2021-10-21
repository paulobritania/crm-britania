import { createMuiTheme } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export default createMuiTheme({
  // defined color palette
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    info: colors.info,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    care: colors.care
  },

  // defined typography default
  typography: {
    fontFamily: fonts.fontFamily,
    fontWeight: fonts.fontWeight.regular,
    color: colors.text
  },

  // defined material default CSS
  overrides: {
    // defined default CSS for Material UI components
    MuiButton: {
      root: {
        borderRadius: 40,
        fontSize: 16,
        height: 41,
        textTransform: 'none',
        '&:hover': { backgroundColor: 'none' }
      },
      contained: {
        color: colors.white,
        '&$disabled': {
          backgroundColor: colors.britPrimary2.lightest,
          color: colors.white
        }
      },
      sizeSmall: {
        fontSize: 16,
        height: 32
      }
    },

    MuiIconButton: {
      root: { padding: 5 },
      label: { '& > div': { display: 'contents' } }
    },

    MuiInputBase: { input: { fontSize: 12 } },

    MuiOutlinedInput: {
      // Name of the rule
      root: {
        height: 40,
        borderTopColor: 'transparent',
        borderRadius: 3,
        backgroundColor: colors.white2,
        '& input': { fontSize: 16 },
        '& fieldset': { borderColor: 'transparent' }
      }
    },

    MuiTooltip: {
      tooltip: {
        backgroundColor: colors.white,
        boxShadow: '0 0 7px 1px rgba(0,0,0,0.3)',
        color: '#324552',
        fontSize: 12
      },
      arrow: { color: colors.white }
    },

    MuiAutocomplete: { inputRoot: { paddingRight: '10px !important' } }
  }
})
