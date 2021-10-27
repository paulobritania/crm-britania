import React from 'react'

import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const CardRounded = ({
  children, style, ...props
}) => (
  <Card
    style={ {
      marginTop: 20,
      borderRadius: 14,
      boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      ...style
    } }
    { ...props }
  >
    <CardContent>
      {children}
    </CardContent>
  </Card>
)

CardRounded.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object
}

CardRounded.defaultProps = {
  children: null,
  style: {}
}

export default CardRounded
