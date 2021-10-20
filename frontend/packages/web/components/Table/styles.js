import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export const useStyles = makeStyles(() => ({
  root: { width: '100%' },
  table: { minWidth: 750 },
  row: { width: 'auto !important' },
  cell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100% !important'
  },
  paginationContainer: {
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    '& .MuiButton-outlined': { border: 'none' }
  },
  btn: { '& .MuiButton-outlined': { border: 'none' } },
  sortIcon: { fontSize: 14 },
  span: { marginLeft: 4 },
  header: { color: colors.primary.main }

}))
