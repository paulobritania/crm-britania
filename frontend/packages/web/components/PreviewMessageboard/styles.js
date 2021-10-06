import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(5),
    maxWidth: 600,
    background: colors.info.light,
    borderLeft: `5px solid ${ colors.care.main }`
  },
  title: { color: theme.palette.primary.main },
  content: {
    fontSize: '1rem',
    fontFamily: 'Maven Pro,Poppins,sans-serif,Arial',
    fontWeight: 400,
    lineHeight: 1.5
  },
  info: {
    color: theme.palette.primary.light,
    '& > span:last-child': { marginLeft: 50 }
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  cardImage: { '& div': { maxWidth: 300, marginLeft: -7 } },
  chip: { border: 'none', '& .MuiChip-deleteIcon': { width: 15, '&:hover': { color: colors.info.main } } },
  labelChip: { maxWidth: 300 },
  divider: {
    margin: '18px 0',
    backgroundColor: colors.britSupport1.lighter
  }
}))

export default useStyles
