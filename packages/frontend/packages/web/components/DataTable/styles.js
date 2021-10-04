import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'
import Button from '@britania-crm/web-components/Button'

export default makeStyles({
  searchField: { marginRight: 10 },
  menuItems: {
    justifyContent: 'center',
    color: colors.britPrimary2.base,
    fontFamily: fonts.fontFaceMavenPro[0].fontFamily,
    fontWeight: fonts.fontWeight.medium,
    fontSize: fonts.fontSize.S,
    border: `1px solid ${ colors.britPrimary1.lightest }`,
    margin: '8px 12px !important',
    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.06)',
    borderRadius: 40,
    '&:hover': {
      border: `1px solid ${ colors.britPrimary2.base }`,
      backgroundColor: colors.white
    }
  }
})

export const ButtonAddNew = styled(Button)`
  font-family: 'Poppins';
  font-size: 14px;
  white-space: nowrap;
`
export const ButtonFilterData = styled(Button)`
  font-family: 'Poppins';
  font-size: 14px;
  white-space: nowrap;
`
export const ButtonDownload = styled(Button)`
  font-family: 'Poppins';
  font-size: 14px;
  white-space: nowrap;
`

export const ButtonGoBack = styled(Button)`
  font-family: 'Poppins';
  font-size: 14px;
  white-space: nowrap;
  margin-right: 10px;
`
export const PopoverItem = styled.div`
cursor : pointer;
  text-align: center;
  border: 1px solid  ${ colors.britPrimary1.lightest };
  color: ${ colors.britPrimary2.base };
  border-radius: 40px;
  padding: 6px;
  font-family: 'Poppins';
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
  &:hover {
      border: 1px solid ${ colors.britPrimary2.base };
    }
`

export const createTheme = ({ dividerColor, backgroundColor }) => (theme) => ({
  ...theme,
  overrides: {
    ...theme.overrides,
    MuiTableCell: {
      ...(theme.overrides.MuiTableCell || {}),
      root: {
        padding: '10px 16px',
        borderBottomColor: `${ dividerColor } !important`
      },
      head: {
        fontFamily: 'Maven Pro',
        fontSize: fonts.fontSize.S,
        fontWeight: `${ fonts.fontWeight.regular } !important`,
        paddingBottom: '5px !important',
        lineHeight: '1.3em'
      },
      stickyHeader: {
        zIndex: theme.overrides.MuiTableCell?.stickyHeader?.zIndex
          ? `${ Number(theme.overrides.MuiTableCell.stickyHeader.zIndex.replace(' !important', '')) - 1 } !important`
          : '100 !important'
      }
    },
    MuiTableSortLabel: {
      ...(theme.overrides.MuiTableSortLabel || {}),
      root: { color: colors.secondary.main },
      active: { color: `${ colors.secondary.main } !important` },
      icon: {
        color: `${ colors.secondary.main } !important`,
        fontSize: fonts.fontSize.SSS
      }
    },
    MuiTablePagination: {
      ...(theme.overrides.MuiTablePagination || {}),
      root: { padding: '0 5px !important' }
    },
    MuiPaper: {
      ...(theme.overrides.MuiPaper || {}),
      root: { width: '100%', backgroundColor },
      rounded: { borderRadius: 4 }
    },
    MuiCardContent: {
      ...(theme.overrides.MuiCardContent || {}),
      root: { padding: '10px !important' }
    },
    MuiCheckbox: {
      ...(theme.overrides.MuiCheckbox || {}),
      root: { marginLeft: '5px !important' }
    },
    MuiTypography: {
      ...(theme.overrides.MuiTypography || {}),
      caption: { padding: '0 5px' }
    },
    MuiOutlinedInput: {
      ...(theme.overrides.MuiOutlinedInput || {}),
      root: {
        ...(theme.overrides.MuiOutlinedInput?.root || {}),
        height: 32
      }
    },
    MuiToolbar: {
      ...(theme.overrides.MuiToolbar || {}),
      root: {
        flexWrap: 'wrap',
        backgroundColor: 'transparent !important'
      },
      gutters: {
        paddingLeft: '0 !important',
        paddingRight: '0 !important'
      }
    },
    MuiPopover: {
      ...(theme.overrides.MuiPopover || {}),
      paper: {
        borderRadius: '24px',
        paddingTop: 14,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 2,
        width: 'auto'
      }

    }
  }
})
