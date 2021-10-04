import React from 'react'

import PropTypes from 'prop-types'

import colors from '@britania-crm/styles/colors'

const PermissionExceptionIcon = ({
  color, size, ...props
}) => (
  <svg { ...props } width={ size } height={ size - 1 } viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.32232 4.79479L6.01147 8.11264L4.71652 6.8107C4.58472 6.67889 4.40595 6.60484 4.21954 6.60484C4.03314 6.60484 3.85437 6.67889 3.72257 6.8107C3.59076 6.94251 3.51671 7.12127 3.51671 7.30768C3.51671 7.39997 3.53489 7.49137 3.57021 7.57664C3.60553 7.66191 3.6573 7.73939 3.72257 7.80465L5.51449 9.59658C5.57956 9.66218 5.65698 9.71426 5.74227 9.74979C5.82757 9.78533 5.91906 9.80363 6.01147 9.80363C6.10387 9.80363 6.19536 9.78533 6.28066 9.74979C6.36595 9.71426 6.44337 9.66218 6.50844 9.59658L10.3163 5.78874C10.3815 5.72348 10.4333 5.646 10.4686 5.56073C10.504 5.47546 10.5221 5.38406 10.5221 5.29177C10.5221 5.19947 10.504 5.10808 10.4686 5.0228C10.4333 4.93753 10.3815 4.86005 10.3163 4.79479C10.251 4.72952 10.1735 4.67775 10.0883 4.64243C10.003 4.60711 9.91159 4.58893 9.8193 4.58893C9.727 4.58893 9.63561 4.60711 9.55033 4.64243C9.46506 4.67775 9.38758 4.72952 9.32232 4.79479ZM7.01942 0C6.10021 0 5.19 0.181052 4.34075 0.53282C3.49151 0.884587 2.71987 1.40018 2.06989 2.05016C0.757195 3.36286 0.0197296 5.14326 0.0197296 6.99969C0.0136103 8.61601 0.57326 10.1835 1.60166 11.4305L0.201722 12.8304C0.104595 12.9289 0.038801 13.0539 0.0126403 13.1896C-0.0135204 13.3254 0.00112478 13.4659 0.054728 13.5934C0.112866 13.7193 0.207114 13.8252 0.325509 13.8975C0.443903 13.9697 0.581105 14.0052 0.719699 13.9994H7.01942C8.87585 13.9994 10.6563 13.2619 11.9689 11.9492C13.2816 10.6365 14.0191 8.85612 14.0191 6.99969C14.0191 5.14326 13.2816 3.36286 11.9689 2.05016C10.6563 0.737465 8.87585 0 7.01942 0ZM7.01942 12.5994H2.40662L3.0576 11.9485C3.18797 11.8173 3.26114 11.6399 3.26114 11.455C3.26114 11.2701 3.18797 11.0927 3.0576 10.9615C2.14105 10.046 1.57028 8.84099 1.44255 7.55182C1.31482 6.26266 1.63802 4.96908 2.35709 3.89149C3.07615 2.8139 4.1466 2.01896 5.38605 1.64211C6.62551 1.26526 7.95728 1.3298 9.15448 1.82476C10.3517 2.31971 11.3402 3.21445 11.9517 4.35653C12.5632 5.49861 12.7598 6.81738 12.508 8.08815C12.2562 9.35892 11.5715 10.5031 10.5707 11.3257C9.56995 12.1483 8.3149 12.5984 7.01942 12.5994Z"
      fill={ color }
    />
  </svg>
)

PermissionExceptionIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
}

PermissionExceptionIcon.defaultProps = {
  color: colors.britSupport1.light,
  size: 15
}

export default PermissionExceptionIcon
