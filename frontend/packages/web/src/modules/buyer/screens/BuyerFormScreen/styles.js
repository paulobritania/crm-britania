import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export const useStyles = makeStyles(() => ({
  container: {
    padding: 30,
    backgroundColor: colors.white
  },
  title: {
    color: colors.primary.main,
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: fonts.fontSize.XLS,
    fontStyle: 'normal',
    fontFamily: fonts.fontFaceMavenPro[0].fontFamily,
    fontWeight: fonts.fontWeight.bold,
    color: '#1F2D3D'
  },
  mainData: {
    fontSize: fonts.fontSize.M,
    fontWeight: fonts.fontWeight.bold
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 24
  },
  resetBtn: {
    borderColor: 'transparent',
    color: colors.britPrimary2.base
  },
  btnSave: {
    marginLeft: 10,
    width: 190
  },
  containerFather: { borderRadius: 0 },
  containerMain: { margin: 10 },
  containerRadio: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    color: colors.white,
    backgroundColor: colors.britSecondary.base
  },
  containerTable: {
    border: `1px solid ${colors.grey20}`,
    borderRadius: 3
  },
  table: {
    background: colors.white,
    padding: 10,
    borderRadius: 3
  },
  tableHeader: {
    display: 'flex',
    fontFamily: fonts.fontOpenSans[0].fontFamily,
    fontWeight: fonts.fontWeight.bold,
    fontSize: fonts.fontSize.SSB,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.grey20
  },
  tableHeaderLine: {
    display: 'flex',
    fontFamily: fonts.fontOpenSans[0].fontFamily,
    fontWeight: fonts.fontWeight.bold,
    fontSize: fonts.fontSize.SSB,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.grey20,
    display: 'flex',
    justifyContent: 'space-between',
    '& > li': {
      display: 'inline',
      float: 'left',
      fontFamily: fonts.fontOpenSans[0].fontFamily,
    }
  },
  labelStatus: { fontSize: '0.75em' },
  status: {
    alignItems: 'center',
    display: 'flex'
  },
  checkbox: { width: '20%' },
  flexContainer: { display: 'flex', maxWidth: 1000 },
  upload: {
    backgroundColor: '#F9FAFC',
    textAlign: 'center',
    border: `${colors.britPrimary2.lightest} solid 2px`,
    borderRadius: 4,
    borderStyle: 'dashed',
    paddingTop: 30
  },
  hasFile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    width: '80%',
    height: '32px',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.grey60,
    fontWeight: fonts.fontWeight.semiBold,
    fontSize: fonts.fontSize.S,
    border: `${colors.grey10} solid 1px`,
    '& > div': {
      '& > p': {
        marginRight: 10
      },
      '& > span': {
        fontSize: fonts.fontSize.SSS,
        fontWeight: fonts.fontWeight.regular
      }
    }
  },
  lgpdTitle: {
    fontSize: fonts.fontSize.S,
    fontWeight: fonts.fontWeight.regular
  },
  lgpdText: {
    fontSize: fonts.fontSize.SSB,
    fontWeight: fonts.fontWeight.regular
  },
  titleTable: {
    fontFamily: fonts.fontFaceMavenPro[0].fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#8492A6'
  }
}))
