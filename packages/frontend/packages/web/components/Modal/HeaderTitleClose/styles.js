import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export default makeStyles({
  closeIcon: { margin: 5 },
  fullScreenIcon: {
    marginTop: 5,
    marginBottom: 5
  },
  header: {
    display: 'inline-flex',
    flex: '0 0 auto',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    flex: 'auto !important',
    paddingBottom: 10,
    color: colors.primary.main,

    '& > *': {
      fontSize: '2rem !important',
      fontWeight: `${ fonts.fontWeight.light } !important`
    }
  },
  center: { textAlign: 'center' }
})
