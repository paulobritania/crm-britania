import styled, { css } from 'styled-components'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export const BadgeOptions = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`

export const Badge = styled.button.attrs({ type: 'button' })`
  outline: none;
  display: flex;
  border-radius: 16px;
  height: 32px;
  min-width: 76px;
  background: ${ colors.white };
  color: ${ colors.primary.main };
  border: 1px solid ${ colors.primary.main };
  letter-spacing: 0.24px;
  align-items: center;
  justify-content: center;
  font-weight: ${ fonts.fontWeight.medium };
  font-family: ${ fonts.fontFaceMavenPro[0].fontFamily };
  padding: 8px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    color: ${ colors.britPrimary1.base };
    border: 2px solid ${ colors.britPrimary1.base };
  }

  &:first-child {
    margin: 5px 5px 5px 0px;
  }

  ${ (props) => props.selected && css`
    color: ${ colors.white };
    background: ${ colors.primary.main };

    &:hover {
      color: ${ colors.white };
      background: ${ colors.britPrimary1.base };
    }
  ` }
`

export const Label = styled.span`
  color: ${ colors.grey3 };
  line-height: 24px;
  font-size: 16px;
  margin-bottom: 6px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
