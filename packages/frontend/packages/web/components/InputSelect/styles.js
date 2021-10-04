import { makeStyles } from '@material-ui/core/styles'

import { colors } from '@britania-crm/styles'

const useStyles = makeStyles({
  menuItem: {
    borderTop: `1px solid ${ colors.grey2 }`,
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'center',
    marginTop: -1
  },
  checkbox: { padding: 0, marginRight: 8 }
})

export default useStyles
