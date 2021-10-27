import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress: { marginLeft: 10 },
  labeledLoaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  label: { padding: '10px 0' },
  absolute: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 9999,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: '11%'
  }
}))
