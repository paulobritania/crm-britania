import React, { useState } from 'react'

import PropTypes from 'prop-types'

import colors from '@britania-crm/styles/colors'

const DeleteIcon = ({
  color, colorHover, size, ...props
}) => {
  const [iconColor, setIconColor] = useState(color)
  return (
    <div onMouseEnter={ () => setIconColor(colorHover) } onMouseLeave={ () => setIconColor(color) }>
      <svg { ...props } width={ size } height={ size + 1 } viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.70983 0.229036C8.10566 0.145343 8.51853 0.222377 8.85755 0.44318C9.19642 0.663879 9.43374 1.01013 9.51734 1.40577L9.5637 1.62377L12.7795 0.940257C13.1306 0.865622 13.4758 1.08977 13.5504 1.44091C13.625 1.79206 13.4009 2.13722 13.0497 2.21185L9.24247 3.02109C9.22804 3.02522 9.21343 3.02887 9.19865 3.03201L4.91932 3.94201C4.90265 3.94555 4.88591 3.94843 4.86914 3.95064L1.0675 4.75868C0.716358 4.83332 0.371198 4.60917 0.296563 4.25803C0.221928 3.90689 0.44608 3.56173 0.797221 3.48709L4.01278 2.80362L3.96653 2.58601C3.88177 2.18971 3.95816 1.77553 4.17899 1.4357C4.39977 1.09595 4.74667 0.85804 5.14312 0.774459L7.70983 0.229036ZM8.29211 1.89405L5.28437 2.53334L5.23792 2.31476L5.2377 2.31378C5.22518 2.25529 5.23646 2.19421 5.26905 2.14406C5.30164 2.0939 5.35287 2.05879 5.4114 2.04648L7.97874 1.50092C8.03708 1.48864 8.09812 1.49997 8.14808 1.53251C8.1981 1.56509 8.23312 1.61621 8.24544 1.67462L8.24567 1.67569L8.29211 1.89405ZM10.1261 3.9082C10.1261 3.54922 10.4171 3.2582 10.7761 3.2582H12.3074C12.4896 3.2582 12.6634 3.33468 12.7865 3.46901C12.9097 3.60334 12.9707 3.78317 12.9549 3.9647L12.1472 13.2218L12.1471 13.2233C12.0806 14.0148 11.4178 14.6228 10.6235 14.6207L10.6222 14.6207L10.6244 13.9707L10.6235 14.6207H4.36236C3.56935 14.6202 2.90865 14.0121 2.84309 13.2218L2.23817 5.93187C2.20848 5.57411 2.47444 5.26003 2.83219 5.23034C3.18995 5.20066 3.50403 5.46661 3.53372 5.82437L4.13863 13.1143C4.14831 13.2309 4.24573 13.3206 4.36274 13.3207H10.6244L10.6267 13.3207C10.744 13.3211 10.842 13.2313 10.8517 13.1143L10.8519 13.1115L11.5982 4.5582H10.7761C10.4171 4.5582 10.1261 4.26719 10.1261 3.9082ZM6.18236 5.8832C6.54135 5.8832 6.83236 6.17421 6.83236 6.5332V10.9082C6.83236 11.2672 6.54135 11.5582 6.18236 11.5582C5.82338 11.5582 5.53236 11.2672 5.53236 10.9082V6.5332C5.53236 6.17421 5.82338 5.8832 6.18236 5.8832ZM8.80736 5.8832C9.16634 5.8832 9.45736 6.17421 9.45736 6.5332V10.9082C9.45736 11.2672 9.16634 11.5582 8.80736 11.5582C8.44837 11.5582 8.15736 11.2672 8.15736 10.9082V6.5332C8.15736 6.17421 8.44837 5.8832 8.80736 5.8832Z" fill={ iconColor }/>
      </svg>
    </div>
  )
}

DeleteIcon.propTypes = {
  color: PropTypes.string,
  colorHover: PropTypes.string,
  size: PropTypes.number
}

DeleteIcon.defaultProps = {
  color: colors.britSupport1.light,
  colorHover: colors.britSupport1.light,
  size: 14
}

export default DeleteIcon
