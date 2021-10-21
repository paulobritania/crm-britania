import React from 'react'

import PropTypes from 'prop-types'

import {
  TextContainer,
  Container
} from '../styles'

const ResponseCard = ({ node }) => (
  <Container>
    <TextContainer>{node.title}</TextContainer>
  </Container>
)

ResponseCard.propTypes = { node: PropTypes.object.isRequired }

export default ResponseCard
