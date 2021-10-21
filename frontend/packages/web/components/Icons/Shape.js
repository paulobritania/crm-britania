import React from 'react'

import PropTypes from 'prop-types'

import colors from '@britania-crm/styles/colors'

const Shape = ({ color, full }) => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="68">
    <rect width="16" height="68" transform="matrix(-1 0 0 1 16 0)" fill={ color } />
  </mask>
  <g mask="url(#mask0)">
    <path fillRule="evenodd" fill={ full ? color : '' } clipRule="evenodd" d="M10.9993 1.36961C11.0053 1.27397 10.9729 1.18001 10.9098 1.11C10.8467 1.03999 10.7585 1.00018 10.6661 1H1.33391C1.24147 1.00004 1.15318 1.03981 1.09005 1.10985C1.02691 1.17989 0.994581 1.27393 1.00074 1.36961C1.16173 3.69477 2.79504 5.6246 4.99695 6.09131V10.6536C4.997 10.788 5.07199 10.9103 5.18934 10.9673C5.30669 11.0243 5.44524 11.0058 5.54481 10.9197L6.88103 9.76472C6.9573 9.699 7.00138 9.60145 7.00129 9.49861V6.09131C9.20399 5.62547 10.8382 3.69539 10.9993 1.36961Z" stroke={ color } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </g>
</svg>
)

Shape.propTypes = {
  color: PropTypes.string,
  full: PropTypes.bool
}

Shape.defaultProps = {
  color: colors.white2,
  full: false
}

export default Shape
