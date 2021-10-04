import React, { useMemo } from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import PropTypes from 'prop-types'

import first from 'lodash/first'
import map from 'lodash/map'

const RouterSwitch = (props) => {
  const { routes, escapeTo } = props

  const escape = useMemo(
    () => (escapeTo || first(map(routes))?.path || '/'),
    [escapeTo, routes]
  )

  const enabledRoutes = useMemo(
    () => map(routes, ({
      path,
      exact,
      Component,
      menu
    }, name) => (
      <Route
        key={ name }
        name={ name }
        path={ path }
        exact={ !!exact }
        component={ Component || (() => <Redirect to={ first(menu?.subMenu)?.path || escape } />) }
      />
    )),
    [escape, routes]
  )

  return (
    <Switch>
      {enabledRoutes}
      <Route component={ () => <Redirect to={ escape } /> } />
    </Switch>
  )
}

RouterSwitch.propTypes = {
  routes: PropTypes.object.isRequired,
  escapeTo: PropTypes.string
}

RouterSwitch.defaultProps = { escapeTo: null }

export default RouterSwitch
