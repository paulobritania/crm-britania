import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export default makeStyles({
  title: { fontSize: fonts.fontSize.S, margin: '5px 0px 5px' },
  addButtonFile: {
    color: colors.white,
    backgroundColor: colors.britSecondary.base
  },
  iconInfo: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})
