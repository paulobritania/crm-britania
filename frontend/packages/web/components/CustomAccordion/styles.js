
import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiAccordionSummary-root': { borderBottom: `1px solid ${ colors.white3 }`, padding: 0 },
    '& .MuiAccordionDetails-root': { padding: '0px 0px 16px' },
    '& .MuiPaper-elevation1': { boxShadow: 'none' }
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium,
    color: colors.primary.main
  },
  header: {
    displa: 'flex',
    justifyContent: 'space-between',
    color: colors.primary.main,
    fontSize: fonts.fontSize.L
  }
}))
