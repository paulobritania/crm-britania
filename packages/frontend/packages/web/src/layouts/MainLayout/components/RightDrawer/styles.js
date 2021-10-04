import styled, { css } from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

const selectColorMenuItem = (color) => {
  switch (color) {
    case 'failed':
      return colors.error.main
    case 'success':
      return colors.success.main
    default:
      return colors.warning.main
  }
}

const drawerWidth = Number(process.env.REACT_APP_DRAWER_WIDTH)

export default makeStyles((theme) => ({
  drawer: {
    width: drawerWidth + 10,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth + 10,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: { width: theme.spacing(9) + 1 }
  },
  switcher: {
    background: colors.primary.main,
    border: 0,
    overflowX: 'hidden'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  arrowRightIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50

  },
  btn: { margin: 15 }
}))

export const Title = styled.h2`
  color: ${ colors.white };
  margin: 0;
  font-size: 12px;
  font-weight: 400;
`

export const StatusChatList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 24px;

  ${ (props) => props.closeRighDrawer && css`
      flex-direction: column;

      & svg {
        display: none;
      }
  ` }
`

export const ItemChat = styled.span`
  font-size: 12px;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 24px;
  font-size: 16px;
  
  & svg {
        margin-right: 8px;
      }
  
  ${ (props) => props.closeRighDrawer && css`
      & > svg {
        display: none;
      }
  ` }
`

export const StatusChatItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 16px;
  cursor: pointer;
  color: ${ (props) => selectColorMenuItem(props.status) };
`

export const SectionItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  padding: 0px 8px 0 0;

  ${ (props) => props.closeRighDrawer && css`
      align-items: center;
  ` }

`

export const Content = styled.div`
  margin-left: -12px;
  
`

export const SubTitle = styled.div`
  display: flex;
  margin-bottom: 2px;
  justify-content: flex-start;
  border-bottom: 1px solid ${ colors.white };
  align-items: center;
  cursor: pointer;
`
export const FilterButton = styled.div`
padding-top: 16px;
`
export const CleanSlaFilter = styled.div`
  display: flex;
  margin-bottom: 2px;
  justify-content: space-between;
  padding: 0 20px 8px 0;
  border-bottom: 1px solid ${ colors.white };
  align-items: center;
  cursor: pointer;
  `

export const SubtitleText = styled.span`
  color: ${ colors.white };
  font-size: 14px;
  font-weight: 500;
`

export const ListSla = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${ (props) => props.closeRighDrawer && css`
      & > svg {
        display: none;
      }

      padding: 20px 0px;
  ` }
`

export const ItemSla = styled.div`
  display: flex;
  align-items: center;
  max-width: 220px;
  border-bottom: 1px solid ${ colors.white };
  padding: 10px 0px;
  width: 100%;
 
`
export const Expiration = styled.div`
display: flex;
align-items: center;
width: 50%;

`
export const Workflow = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
max-width: 50%;
`

export const ExpirationDate = styled.span`
font-size: 10px;
color: ${ (props) => props.color };
padding-left: 8px;
`

export const WorkflowType = styled.span`
font-size: 10px;
color: ${ colors.britSupport2.base };
cursor: default;
`
export const Company = styled.span`
font-size: 10px;
color: ${ colors.white };
font-weight: bold;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
width:100%;
`
export const TimeIndicator = styled.div`
padding-bottom: 18px;

`

export const ListPost = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`
export const PostItem = styled.div`
  display: flex;
  flex-direction: column;

  > :first-child {
    cursor: pointer;
    user-select: none;
  }
  
  &:first-child {
    margin-top: 16px;
  }

  & + div {
    margin-top: 14px;
  }

  & > div:first-child {
    background: ${ colors.britPrimary1.darkest };
    color: ${ colors.white };
    padding: 6px 10px;
    border-radius: 16px 16px 16px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    > span {
      font-size: 11px;
    }
    :hover{
      background: ${ colors.white };
      color: ${ colors.britPrimary1.darkest };
    }
  }

  & > div:nth-child(2) {
    color: ${ colors.britPrimary2.lighter } !important;
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > span {
      font-size: 11px;
    }
  }
`

export const Divider = styled.div`
  width: 42px;
  height: 2px;
  background: ${ colors.grayBlue };
`

export const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & div {
    margin-top: 10px;
  }
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 19px 1fr;
  align-items: flex-start;
  width: 100%; 
`

export const SelectTheme = {
  overrides: {
    MuiSelect: {
      select: {
        color: colors.britSupport2.darker,
        fontSize: 14,
        fontWeight: 500,
        '&:focus': { backgroundColor: 'transparent' },
        '&:hover': { backgroundColor: colors.primary.light, borderRadius: 5 },
        borderRadius: 5,
        marginBottom: 0,
        padding: '3px 2px'

      },

      icon: { color: colors.britSupport2.darker }
    },
    MuiInput: {
      // root: { maxWidth: 130 },
      underline: {
        '&::after': { borderBottom: '1px solid transparent' },
        '&::before': { borderBottom: '1px solid transparent' },
        '&:hover::after': { borderBottom: '1px solid transparent' },
        '&:hover:not(.Mui-disabled)::before': { borderBottom: '1px solid transparent' }
      }
    },
    MuiInputLabel: {
      root: {
        color: colors.britSupport2.darker,
        fontSize: 14,
        fontWeight: 500,
        zIndex: 9999
      }
    },
    MuiMenu: {
      paper: {
        maxHeight: 130,
        marginTop: 32,
        marginLeft: 8,
        backgroundColor: colors.secondary.light,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        '&::-webkit-scrollbar': { display: 'none' }
      },
      list: { padding: 0 }
    },
    MuiListItem: { root: { borderBottom: `1px solid${ colors.britPrimary2.lighter }`, color: colors.britSupport2.darker } },
    MuiFormControl: { root: { marginBottom: '2px !important' } }

  }
}
