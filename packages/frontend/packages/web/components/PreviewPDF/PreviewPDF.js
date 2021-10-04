import React from 'react'

import PropTypes from 'prop-types'

const PreviewPDF = ({ url }) => (
  <object data={ url } type="application/pdf" width="100%" height="100%">
  </object>
)

PreviewPDF.propTypes = { url: PropTypes.string.isRequired }

export default PreviewPDF
