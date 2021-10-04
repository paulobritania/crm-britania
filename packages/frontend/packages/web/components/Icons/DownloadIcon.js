
import React, { useState } from 'react'

import PropTypes from 'prop-types'

import colors from '@britania-crm/styles/colors'

const DownloadIcon = ({
  size, color, id, colorHover, onClick
}) => {
  const [iconColor, setIconColor] = useState(color)

  return (
    <div onMouseEnter={ () => setIconColor(colorHover) } onMouseLeave={ () => setIconColor(color) } onClick={ onClick } >
      <svg width={ size } height={ size } viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id={ `mask${ id }` } mask-type="alpha" maskUnits="userSpaceOnUse" x="4" y="2" width="12" height="16">
          <path fillRule="evenodd" clipRule="evenodd" d="M12.4998 7.9165H13.8248C14.5665 7.9165 14.9331 8.8165 14.4081 9.3415L10.5831 13.1665C10.2581 13.4915 9.73313 13.4915 9.40813 13.1665L5.58313 9.3415C5.05813 8.8165 5.43313 7.9165 6.17479 7.9165H7.49979V3.74984C7.49979 3.2915 7.87479 2.9165 8.33313 2.9165H11.6665C12.1248 2.9165 12.4998 3.2915 12.4998 3.74984V7.9165ZM4.99984 17.0832C4.5415 17.0832 4.1665 16.7082 4.1665 16.2498C4.1665 15.7915 4.5415 15.4165 4.99984 15.4165H14.9998C15.4582 15.4165 15.8332 15.7915 15.8332 16.2498C15.8332 16.7082 15.4582 17.0832 14.9998 17.0832H4.99984Z" fill={ iconColor }/>
        </mask>
        <g mask={ `url(#mask${ id })` }>
          <rect width="20" height="20" fill={ iconColor }/>
        </g>
      </svg>
    </div>
  )
}

DownloadIcon.propTypes = {
  color: PropTypes.string,
  id: PropTypes.number,
  size: PropTypes.number,
  colorHover: PropTypes.string,
  onClick: PropTypes.func
}

DownloadIcon.defaultProps = {
  color: colors.britSupport1.light,
  id: Date.now(),
  size: 20,
  colorHover: colors.britSupport1.light,
  onClick () {}
}

export default DownloadIcon
