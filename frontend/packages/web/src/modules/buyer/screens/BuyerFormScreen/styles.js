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
  tableHeader: {
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
      float: 'left'
    }
  },
  labelStatus: { fontSize: '0.75em' },
  status: {
    alignItems: 'center',
    display: 'flex'
  },
  checkbox: { width: '20%' },
  flexContainer: { display: 'flex' },
  upload: {
    backgroundColor: '#F9FAFC',
    textAlign: 'center',
    border: `${colors.britPrimary2.lightest} solid 2px`,
    borderRadius: 4,
    borderStyle: 'dashed'
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
  }
}))

export const ShadowBox = styled.div`
  display: flex;
  background-color: ${colors.white5};
  margin: 32;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding: 32px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  box-shadow: none;
`

export const ContentBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`
