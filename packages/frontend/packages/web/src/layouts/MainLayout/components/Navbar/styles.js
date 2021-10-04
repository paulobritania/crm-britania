import styled from 'styled-components'

import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export const useStyles = makeStyles((theme) => ({
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  search: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#000',
    position: 'relative',
    marginBottom: -8,
    marginRight: 20,
    marginLeft: 0,
    paddingLeft: 15,
    width: '70%',
    borderBottom: '1px solid #a5a5a5'
  },
  DatePickerRange: {
    color: '#a5a5a5',
    position: 'relative',
    marginRight: 0,
    marginLeft: 0,
    width: 300
  },
  searchIcon: { marginTop: '-12px' },
  calendarPopoverPaper: { padding: '10px' },
  datePicker: { margin: '10px' },
  calendarIcon: { marginTop: '-12px' },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  whiteColor: { color: 'white' },
  grayColor: { color: '#a3a3a3' },
  inputRoot: {
    width: '80%',
    color: 'inherit'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width')
  },
  grow: { flexGrow: 1 },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: { display: 'flex' }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: { display: 'none' }
  },
  customSelect: {
    display: 'flex',
    justifyContent: 'center',
    '& .MuiSelect-root': {
      fontSize: 12,
      height: 18,
      minWidth: 100,
      paddingLeft: 35,
      paddingRight: 0,
      paddingTop: 10,
      marginRight: 22,
      marginTop: 4
    },
    '& .MuiSvgIcon-root': {
      position: 'absolute',
      top: 10,
      '&:first-child': { left: 5 }
    }
  }
}))

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  svg {
    color: ${ colors.britSupport1.lighter };
  }
`

export const HomeButton = styled(IconButton)`
  margin-right: 15px;
`

export const Info = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid ${ colors.britSupport1.lighter };
  padding-right: 10px;
  margin-right: 40px;

  > div {
    margin-left: 5px;
    position: relative;

    > div {
      position: absolute;
      width: 12px;
      height: 12px;
      background: orange;
      border-radius: 50%;
      top: 0;
      right: 0;
      border: 2px solid ${ colors.white };
    }
  }
`

export const Profile = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  cursor: pointer;

  > span {
    display: inline-block;
    color: ${ colors.britSupport1.lighter };
    min-width: 100px
  }

  > svg {
    color: ${ colors.primary.main };
    margin: 0px 10px;
  }

  strong {
    color: ${ colors.primary.main };
    font-weight: normal;
  }
`

export const ProfileImg = styled.img`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`
