import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import { colors } from '@britania-crm/styles'

export default makeStyles((theme) => ({
  '& .MuiDialog-paper': { borderRadius: 25 },
  contentText: {
    fontFamily: theme.typography.fontFamily,
    '& p': { marginBottom: 5 }
  },
  dialogTop: { alignItems: 'flex-start' },
  withoutFooter: { paddingBottom: 24 },
  footerContainer: {
    backgroundColor: colors.white,
    padding: 15,
    zIndex: 420,
    '& button': { flex: 1, maxWidth: 200 }
  },
  footerCenter: { justifyContent: 'center' }
}))

export const FooterContent = styled.div`
  display: flex;
  width: 100%;
`
