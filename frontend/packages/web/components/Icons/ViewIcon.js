import React, { useState } from 'react'

import PropTypes from 'prop-types'

import colors from '@britania-crm/styles/colors'

const ViewIcon = ({
  color, colorHover, size, ...props
}) => {
  const [iconColor, setIconColor] = useState(color)
  return (
    <div onMouseEnter={ () => setIconColor(colorHover) } onMouseLeave={ () => setIconColor(color) }>
      <svg { ...props } width={ size } height={ size } viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.4982 0.829881C7.09403 0.764049 3.57327 3.49121 1.35981 6.28421C0.878598 6.89663 0.878598 7.82679 1.35981 8.43922C3.52513 11.1732 7.03576 13.9632 10.4982 13.8964C13.9607 13.9632 17.4722 11.1732 19.6392 8.43922C20.1204 7.82679 20.1204 6.89663 19.6392 6.28421C17.4232 3.49121 13.9025 0.764049 10.4982 0.829881Z" stroke={ iconColor } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.6651 7.36362C13.6646 9.36852 12.2466 10.9934 10.4976 10.9931C8.74872 10.9927 7.33114 9.36722 7.3313 7.36233C7.33145 5.35744 8.74928 3.73225 10.4982 3.73225C11.3383 3.73199 12.1441 4.11453 12.7381 4.79563C13.3321 5.47673 13.6656 6.40053 13.6651 7.36362V7.36362Z" stroke={ iconColor } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

ViewIcon.propTypes = {
  color: PropTypes.string,
  colorHover: PropTypes.string,
  size: PropTypes.number
}

ViewIcon.defaultProps = {
  color: colors.britSupport1.light,
  colorHover: colors.britSupport1.light,
  size: 21
}

export default ViewIcon
