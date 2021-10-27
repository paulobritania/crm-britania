import styled from 'styled-components'

import colors from '@britania-crm/styles/colors'

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  color: ${ colors.britSupport1.darkest };
  width: 100%;
`

export const Line = styled.div`
  width: 100%;
  display: flex;
  margin: 2px 0;

  align-items: center;
`

export const Description = styled.span`
  flex-basis: 30px;
  text-align: right;
  font-weight: 400;
  font-size: 10px;
  margin-right: 5px;

  flex-shrink: 0;
`

export const Container = styled.div`
  display: flex;
  width: 100%;
`

export const RightColumn = styled.div``

export const LeftColumn = styled.div`
  margin-left: auto;
  margin-top: -5px;
`
