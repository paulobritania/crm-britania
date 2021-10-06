import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import colors from '@britania-crm/styles/colors'

const useStyles = makeStyles({
  root: {
    flexWrap: 'nowrap',
    '& .MuiList-padding': { padding: 0 },
    '& .MuiPaper-rounded': { borderRadius: 25 }
  },
  circleButton: {
    '&.Mui-disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
      pointerEvents: 'painted'
    }
  },
  circleInput: {
    width: '100%',
    maxWidth: 184.15,
    height: 29.84,
    backgroundColor: '#F9F9FC',
    fontStyle: 'normal',
    borderRadius: 20,
    color: '#959597',
    '& .MuiInputBase-root': { borderRadius: 20 },
    '& .MuiInputBase-input': { fontSize: 14 },
    '& .MuiOutlinedInput-input': { padding: '8px 14px 10px 0px' }
  },
  paper: {
    margin: 0,
    borderRadius: 25,
    boxShadow: 'none',
    height: 'auto',
    maxHeight: '100%',
    overflowX: 'hidden',
    padding: '14px',
    backgroundColor: colors.white5,
    position: 'relative'
  },
  card: {
    height: 374.38,
    padding: 30,
    boxShadow: 'none',
    borderRadius: 25,
    backgroundColor: colors.white
  },
  list: {
    width: 'auto',
    height: 260,
    overflow: 'auto',
    borderTop: '1px solid #BDBDBD',
    '& ::-webkit-scrollbar': {
      width: 10,
      height: 10
    },
    '& .MuiListItem-root': { borderBottom: '1px solid #BDBDBD' }
  },
  divider: { background: '#BDBDBD' }
})
export default useStyles

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`
export const ListTitle = styled.p`
  color: ${ colors.primary.main };
  margin-right: 12px;
  margin-top: 0;
  font-style: bold;
  font-size: 16px;
  font-weight: bold;
`

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const AlertHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
export const AlertHeaderLabel = styled(Typography)`
  display: flex;
  margin-right: 8px;
  color: ${ colors.britSupport1.base };
`

export const AlertHeaderTitleProfile = styled(Typography)`
  color: ${ colors.warning.dark };
  font-weight: bold;
  font-size: 20px;
`
