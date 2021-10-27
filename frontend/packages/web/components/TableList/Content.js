import React from 'react'

import PropTypes from 'prop-types'

import { Table } from './styles'

const Content = (props) => <Table { ...props } />

Content.propTypes = { children: PropTypes.node.isRequired }

export default Content
