import React from 'react'

import PropTypes from 'prop-types'

import colors from '@britania-crm/styles/colors'

const SearchIcon = ({ color, size }) => (
  <svg width={ size } height={ size } viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 13L10.1 10.1M6.33333 11.6667C9.27885 11.6667 11.6667 9.27885 11.6667 6.33333C11.6667 3.38781 9.27885 1 6.33333 1C3.38781 1 1 3.38781 1 6.33333C1 9.27885 3.38781 11.6667 6.33333 11.6667Z" stroke={ color } strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

SearchIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
}

SearchIcon.defaultProps = {
  color: colors.britSupport1.light,
  size: 14
}

export default SearchIcon
