import styled from 'styled-components'

import Accordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import font from '@britania-crm/styles/fonts'

export default makeStyles({
  labelFilter: { fontSize: font.fontSize.S },
  text: { fontSize: font.fontSize.SSB }
})

export const AccordionContainer = styled(Accordion)`
    background-color: ${ colors.britPrimary2.lightest };
    border: none;
`

export const AccordionSummary = styled(MuiAccordionSummary)`
    margin-top: 0;
    & > .MuiAccordionSummary-content {
        margin: 0;
    }
`

export const AccordionHeader = styled.div`
    display: flex;
    align-items: center;
    & > p {
        color: ${ colors.black2 };
        font-size: ${ font.fontSize.S };
        margin-right: 8px;
    }
    & > button {
        line-height: ${ font.fontSize.S };
        font-size: ${ font.fontSize.SSB };
        color: ${ colors.secondary.main };
    }
    & .MuiButton-endIcon {
        margin-left: 0;
    }
`

export const FilterWrapper = styled.section`
    background-color: ${ colors.britPrimary2.lightest };
    margin-bottom: 16px;
    & .MuiPaper-root {
        box-shadow: none;
    }
`
export const FilterHeader = styled.header`
    margin-bottom: 34px
`
export const FilterBody = styled.div`
    margin-bottom: 34px
`
export const FilterFooter = styled.footer`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 24px; 
    padding: 0px 16px;
    & button {
        margin-left: 16px;
    }
`
