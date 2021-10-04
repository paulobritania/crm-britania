import CheckboxMui from '@material-ui/core/Checkbox'
import FormControlLabelMui from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export const FormControlLabel = withStyles({
  root: {
    color: `${ colors.grey3 }`,
    fontWeight: `${ fonts.fontFaceMavenPro[0].fontFamily }`,
    fontSize: `${ fonts.fontSize.S }`
  }
})(FormControlLabelMui)

export const Checkbox = withStyles({
  root: {
    '&:hover': {
      background: 'transparent',
      backgroundColor: 'transparent'
    }
  },
  checked: {
    '&:hover': {
      background: 'transparent !important',
      backgroundColor: 'transparent !important'
    }
  }
})(CheckboxMui)
