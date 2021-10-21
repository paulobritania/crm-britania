import React from 'react'

import PropTypes from 'prop-types'

import I18n from '@britania-crm/i18n'

import {
  TextContainer,
  Line,
  Description,
  Container,
  RightColumn
} from '../styles'

const ConditionCard = ({ node }) => (
  <Container>
    <RightColumn>
      <Line>
        <I18n as={ Description }>title</I18n>
        <TextContainer>{node.title}</TextContainer>
      </Line>
      <Line>
        <I18n as={ Description }>menu</I18n>
        <TextContainer>{node.field?.access?.name || node.access?.name }</TextContainer>
      </Line>
      <Line>
        <I18n as={ Description }>field</I18n>
        <TextContainer>{node.field?.name}</TextContainer>
      </Line>
      <Line>
        <I18n as={ Description }>value</I18n>
        <TextContainer>{`${ node.comparisonSymbol } ${ node.comparisonValue }`}</TextContainer>
      </Line>
    </RightColumn>
  </Container>
)

ConditionCard.propTypes = { node: PropTypes.object.isRequired }

export default ConditionCard
