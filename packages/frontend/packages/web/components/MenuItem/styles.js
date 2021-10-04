import { makeStyles } from '@material-ui/core/styles'

import { colors } from '@britania-crm/styles'

export const useStyles = makeStyles({
  itemIcon: { minWidth: 35 },
  listItem: { whiteSpace: 'nowrap' },
  gutters: { paddingRight: 0, paddingLeft: 0 },
  text: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 16,
    fontSize: 14
  },
  subMenu: { marginLeft: 20 },
  menuLink: {
    width: '100%',
    display: 'flex',
    '& * ': {
      color: `${ colors.britSupport1.base } !important`,
      fill: `${ colors.britSupport1.base } !important`,
      whiteSpace: 'nowrap'
    }
  },
  menuActive: {
    display: 'flex',
    '& * ': {
      color: `${ colors.white } !important`,
      fontWeight: '600',
      fill: `${ colors.britSecondary.base } !important`
    },
    '& $activeIndicator': {
      opacity: 1,
      backgroundColor: `${ colors.britSecondary.base } !important`,
      borderColor: colors.britSecondary.base
    },
    '& $listItem': { width: 'calc(100% - 4px)' }
  },
  activeIndicator: {
    borderRight: 'solid 5px',
    borderRadius: '0px 6px 6px 0px',
    opacity: 0,
    height: 20
  },
  listItemIcon: {
    minWidth: 21,
    width: 21,
    marginLeft: 16
  },
  icon: { fill: colors.white }
})
