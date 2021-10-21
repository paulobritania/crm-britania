import React from 'react'

import PropTypes from 'prop-types'

import colors from '@britania-crm/styles/colors'

const FilterIcon = ({ color, id }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id={ `mask${ id }` } mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="14" height="14">
      <path d="M3.54166 4.67492C5.225 6.83325 8.33333 10.8333 8.33333 10.8333V15.8333C8.33333 16.2916 8.70833 16.6666 9.16666 16.6666H10.8333C11.2917 16.6666 11.6667 16.2916 11.6667 15.8333V10.8333C11.6667 10.8333 14.7667 6.83325 16.45 4.67492C16.875 4.12492 16.4833 3.33325 15.7917 3.33325H4.2C3.50833 3.33325 3.11666 4.12492 3.54166 4.67492Z" fill="black"/>
    </mask>
    <g mask={ `url(#mask${ id })` }>
      <rect width="20" height="20" fill={ color }/>
    </g>
  </svg>

)

FilterIcon.propTypes = { color: PropTypes.string, id: PropTypes.number }

FilterIcon.defaultProps = { color: colors.britSupport1.light, id: Date.now() }

export default FilterIcon
