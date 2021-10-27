import styled from 'styled-components'

import AppBar from '@material-ui/core/AppBar'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export const Container = styled(AppBar)`
  background: transparent;
  .MuiTab-root{
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    font-size: ${ fonts.fontSize.S }px;
  }
  .MuiButtonBase-root {
    text-transform: initial;
  }
  .Mui-selected {
    background: white;
    line-height: 24px;
    color: ${ colors.britPrimary1.base };
    font-weight: ${ fonts.fontWeight.bold };
  }
  .MuiTab-root:not(.Mui-selected) {
    background-color: ${ colors.britPrimary2.lightest };
    font-weight: ${ fonts.fontWeight.normal };
    color: ${ colors.primary.main };
  }
  .MuiTabs-indicator {
    display: none;
  }
`

export const TabsContent = styled.div`
  background: ${ colors.white };
  padding: 24px;
`

export const FooterContent = styled.div`
  padding: 10px 0;
  width: 100%;
  display: flex;
`
