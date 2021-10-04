import React, { useState } from 'react'

import PropTypes from 'prop-types'

import colors from '@britania-crm/styles/colors'

const EditIcon = ({
  color, colorHover, size, ...props
}) => {
  const [iconColor, setIconColor] = useState(color)
  return (
    <div onMouseEnter={ () => setIconColor(colorHover) } onMouseLeave={ () => setIconColor(color) }>
      <svg { ...props } width={ size } height={ size + 1 } viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.9989 4.74884C14.9995 4.6503 14.9805 4.55263 14.9432 4.46141C14.9059 4.37019 14.8509 4.28722 14.7814 4.21727L11.6016 1.0428C11.5316 0.973412 11.4485 0.918514 11.3571 0.881255C11.2657 0.843997 11.1679 0.825111 11.0692 0.825681C10.9705 0.825111 10.8726 0.843997 10.7813 0.881255C10.6899 0.918514 10.6068 0.973412 10.5367 1.0428L8.41438 3.16161L0.217496 11.3448C0.14799 11.4148 0.0930006 11.4978 0.05568 11.589C0.0183593 11.6802 -0.000558092 11.7779 1.25348e-05 11.8764V15.0509C1.25348e-05 15.2494 0.0790242 15.4399 0.219666 15.5803C0.360308 15.7207 0.551059 15.7996 0.749957 15.7996H3.92972C4.03466 15.8053 4.13962 15.7889 4.23781 15.7515C4.336 15.7141 4.42522 15.6565 4.49968 15.5824L12.6516 7.39922L14.7814 5.31785C14.8499 5.24528 14.9056 5.16177 14.9464 5.07078C14.9536 5.0111 14.9536 4.95077 14.9464 4.89109C14.9499 4.85624 14.9499 4.82112 14.9464 4.78627L14.9989 4.74884ZM3.62224 14.3022H1.4999V12.1834L8.94685 4.74884L11.0692 6.86764L3.62224 14.3022ZM12.1266 5.81198L10.0043 3.69318L11.0692 2.63752L13.184 4.74884L12.1266 5.81198Z" fill={ iconColor }/>
      </svg>
    </div>
  )
}

EditIcon.propTypes = {
  color: PropTypes.string,
  colorHover: PropTypes.string,
  size: PropTypes.number
}

EditIcon.defaultProps = {
  color: colors.britSupport1.light,
  colorHover: colors.britSupport1.light,
  size: 15
}

export default EditIcon
