import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 400,
    borderRadius: 25,
    background: colors.info.light
  },
  container: {
    padding: theme.spacing(3),
    maxWidth: 400
  },
  title: { color: theme.palette.primary.text },
  title2: { color: theme.palette.primary.main },
  content: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 6,
    '-webkit-box-orient': 'vertical',
    fontSize: '1rem',
    fontFamily: 'Maven Pro,Poppins,sans-serif,Arial',
    fontWeight: 400,
    lineHeight: 1.5
  },
  info: {
    color: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

export default useStyles
