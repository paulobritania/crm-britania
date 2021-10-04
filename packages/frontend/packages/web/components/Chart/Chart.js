/* eslint-disable react/no-this-in-sfc */
import React, { useMemo } from 'react'

import highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsLollipop from 'highcharts/modules/lollipop'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display'
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

NoDataToDisplay(highcharts)
if (typeof highcharts === 'object') {
  // init the module
  HighchartsLollipop(highcharts)
  highcharts.setOptions({ lang: { resetZoom: 'Remover zoom' } })
}

const Chart = (props) => {
  const {
    options: externalOptions,
    containerProps,
    ...rest
  } = props

  const options = useMemo(
    () => ({
      ...externalOptions,
      credits: { enabled: false },
      chart: {
        zoomType: 'x',
        resetZoomButton: {
          position: {
            align: 'right',
            y: -35
          }
        },
        ...(externalOptions.chart || {})
      },
      legend: {
        align: 'left',
        verticalAlign: 'top',
        ...(externalOptions.legend || {})
      },
      tooltip: {
        positioner () {
          // eslint-disable-next-line react/no-this-in-sfc
          return this.chart.plotBox
        },
        shape: 'square',
        crosshairs: true,
        shared: true,
        useHTML: true,
        followTouchMove: true,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        shadow: false,
        style: {
          fontSize: 14,
          zIndex: 9999
        },
        formatter (tooltip) {
          return `
            <style>
              .highcharts-tooltip>span {
                background-color: #fff;
                border: 1px solid #FFC80A;
                border-radius: 3px;
                padding: 5px 10px;
                box-shadow: 0 1px 3px 0 rgba(0,0,0,0.14);
              }
            </style>
            ${ tooltip.defaultFormatter.call(this, tooltip).join('') }
          `
        },
        ...(externalOptions.tooltip || {})
      }
    }),
    [externalOptions]
  )

  return !isEmpty(externalOptions) && (
    <div>
      <HighchartsReact
        highcharts={ highcharts }
        { ...rest }
        options={ options }
        containerProps={ {
          ...containerProps,
          style: {
            width: '100%',
            ...(containerProps.style || {})
          }
        } }
      />
    </div>
  )
}

Chart.propTypes = {
  options: PropTypes.object,
  containerProps: PropTypes.object
}

Chart.defaultProps = {
  options: {},
  containerProps: {}
}

export default Chart
