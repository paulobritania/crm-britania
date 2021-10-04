
import React from 'react'

import PropTypes from 'prop-types'

import colors from '@britania-crm/styles/colors'

const UploadedImageSuccess = ({ color, size }) => (
  <svg width={ size } height={ size - 1 } viewBox="0 0 98 97" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="49.4688" cy="48.5" r="48.5" fill={ color } />
    <path d="M26.9688 51L42.9688 65L72.9688 32" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

UploadedImageSuccess.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
}

UploadedImageSuccess.defaultProps = {
  color: colors.success.main,
  size: 98
}

export default UploadedImageSuccess
