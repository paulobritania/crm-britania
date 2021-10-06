import React from 'react'

import PropTypes from 'prop-types'

import {
  Container,
  ColoredBar,
  ContentContainer,
  Title
} from './styles'

import './styles.css'

const CardHoc = ({
  component, type, title, fullWidth
}) => (
  <Container full={ fullWidth }>
    <ColoredBar color={ type?.color }>
      {type?.icon}
    </ColoredBar>
    <ContentContainer align={ title ? 'flex-start' : 'center' }>
      {title && <Title color={ type?.color }>{title}</Title>}
      {component}
    </ContentContainer>
  </Container>
)

CardHoc.propTypes = {
  component: PropTypes.element.isRequired,
  type: PropTypes.shape({
    color: PropTypes.string,
    icon: PropTypes.element
  }).isRequired,
  title: PropTypes.element.isRequired,
  fullWidth: PropTypes.bool
}

CardHoc.defaultProps = { fullWidth: false }

export default CardHoc
