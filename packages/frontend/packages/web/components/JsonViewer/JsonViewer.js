import React, { useMemo } from 'react'
import ReactJson from 'react-json-view'

import PropTypes from 'prop-types'

import isObject from 'lodash/isObject'
import omitBy from 'lodash/omitBy'
import startsWith from 'lodash/startsWith'

const JsonViewer = (props) => {
  const { data, name } = props

  const src = useMemo(
    () => {
      try {
        const removeWebpackAttrs = (json) => omitBy(json, (_, attrName) => startsWith(attrName, '__'))
        if (isObject(data)) {
          return removeWebpackAttrs(data)
        }
        return removeWebpackAttrs(JSON.parse(data))
      } catch (e) {
        return e
      }
    },
    [data]
  )

  return (
    <div
      style={ {
        display: 'flex',
        background: 'white',
        padding: 10,
        borderRadius: 4,
        boxSizing: 'border-box'
      } }
    >
      <ReactJson
        src={ src }
        collapsed={ 1 }
        name={ name }
      />
    </div>
  )
}

JsonViewer.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.string
  ]),
  name: PropTypes.string
}

JsonViewer.defaultProps = {
  data: {},
  name: null
}

export default JsonViewer
