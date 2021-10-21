import React, {
  useState,
  useCallback,
  memo
} from 'react'

import PropTypes from 'prop-types'

import MuiTabs from '@material-ui/core/Tabs'

import {
  Container,
  TabsContent,
  FooterContent
} from './styles'
import TabPanel from './TabPanel'

const Tabs = ({
  tabs,
  tabsContent,
  children
}) => {
  const [value, setValue] = useState(0)

  const handleChange = useCallback((event, newValue) =>
    setValue(newValue)
  , [])

  return (
    <Container position="static" color="default">
      <MuiTabs
        value={ value }
        onChange={ handleChange }
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        {tabs}
      </MuiTabs>
      <TabsContent>
        {tabsContent.map((tabContent, index) => (
          <TabPanel
            key={ index }
            value={ value }
            index={ index }
          >
            {tabContent}
          </TabPanel>
        ))}

        <FooterContent>
          {children}
        </FooterContent>
      </TabsContent>
    </Container>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  tabsContent: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string.isRequired })).isRequired,
  children: PropTypes.any
}

Tabs.defaultProps = { children: null }

export default memo(Tabs)
