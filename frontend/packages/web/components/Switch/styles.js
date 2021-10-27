import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles({
  thumb: { border: `2px solid ${ colors.secondary.main } !important` },
  checked: {
    color: `${ colors.white } !important`,
    '& + $track': { backgroundColor: `${ colors.secondary.main } !important` }
  },
  track: {
    backgroundColor: `${ colors.britSupport1.base } !important`,
    opacity: '1 !important'
  }
})
