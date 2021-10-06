import React, { useState } from 'react'

import PropTypes from 'prop-types'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'

import { useT } from '@britania-crm/i18n'
import IconButton from '@britania-crm/web-components/IconButton'
import InfoIcon from '@britania-crm/web-components/Icons/infoIcon'
import Tooltip from '@britania-crm/web-components/Tooltip'

import useStyles from './styles'

const CustomAccordion = ({
  header, children, handleInfo
}) => {
  const classes = useStyles()
  const t = useT()

  const [expanded, setExpanded] = useState(false)

  return (
    <div className={ classes.root }>
      <Accordion onChange={ (event, expanded) => setExpanded(expanded) }>
        <AccordionSummary
          expandIcon={ expanded ? <Remove/> : <Add /> }
          aria-controls="panel1a-content"
          id="panel1a-header"
          classes={ { content: classes.header } }
        >
          <Typography as={ Typography } className={ classes.heading }>
            {header}
          </Typography>
          {handleInfo && (
            <Tooltip title={ t('documentation', { howMany: 1 }) } arrow>
              <IconButton color="care" onClick={ handleInfo } >
                <InfoIcon />
              </IconButton>
            </Tooltip>
          )}
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

CustomAccordion.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string.isRequired,
  handleInfo: PropTypes.func
}

CustomAccordion.defaultProps = { handleInfo: undefined }

export default CustomAccordion
