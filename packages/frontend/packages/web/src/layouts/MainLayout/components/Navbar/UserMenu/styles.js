import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles({
  container: {
    padding: 0,
    width: 200
  },
  listItemIcon: { minWidth: 35 },
  item: {
    '& > *': {
      color: `${ colors.text } !important`,
      '& span': { fontSize: '0.9rem !important' }
    },
    '&:hover': {
      '& > *': {
        color: `${ colors.primary.main } !important`,
        '& path': { fill: `${ colors.primary.main } !important` }
      }
    }
  }
})
