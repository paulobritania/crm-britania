import React, { memo } from 'react'

import PropTypes from 'prop-types'

import { Container } from './styles'

const WeightSum = ({ children }) => <Container>{children}</Container>

WeightSum.propTypes = { children: PropTypes.any }

WeightSum.defaultProps = { children: null }

export default memo(WeightSum)
