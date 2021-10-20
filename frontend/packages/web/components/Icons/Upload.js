
import React from 'react'

import PropTypes from 'prop-types'

import colors from '@britania-crm/styles/colors'

const Upload = ({ color, size }) => (
  <svg width={ size } height={ size } viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34 59.5C48.0833 59.5 59.5 48.0833 59.5 34C59.5 19.9167 48.0833 8.5 34 8.5C19.9167 8.5 8.5 19.9167 8.5 34C8.5 48.0833 19.9167 59.5 34 59.5Z" stroke={ color } strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M34 46.75V21.25" stroke={ color } strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M34 21.25L24.4375 30.8125" stroke={ color } strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M34 21.25L43.5625 30.8125" stroke={ color } strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

Upload.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
}

Upload.defaultProps = {
  color: colors.britSecondary.base,
  size: 68
}

export default Upload
