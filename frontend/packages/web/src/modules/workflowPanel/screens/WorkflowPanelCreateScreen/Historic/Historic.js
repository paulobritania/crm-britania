import React from 'react'

import PropTypes from 'prop-types'

import map from 'lodash/map'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { useT } from '@britania-crm/i18n'
import { formatBackDateTimeToFriendlyFormat } from '@britania-crm/utils/date'
import CustomAccordion from '@britania-crm/web-components/CustomAccordion'

import { useStyles } from '../styled'

const HistoricAccordion = ({ workflow }) => {
  const t = useT()

  const classes = useStyles()

  return (
    <CustomAccordion header={ t('historic') }>
      <List dense={ false } className={ classes.list }>
        <ListItem className={ classes.listItem }>
          <ListItemText
            primary={ t('changed by') }
            className={ classes.infoUser }
          />
          <ListItemText
            primary={ t('edition date') }
            className={ classes.infoDate }
          />
          <ListItemText
            primary={ t('changed field') }
            className={ classes.infoChanges }
          />
        </ListItem>
        {
          map(workflow?.histories, ({
            updatedBy, updatedAt, updatedFields, version
          }) => (
            <ListItem key={ version } className={ classes.listItem }>
              <ListItemText
                primary={ updatedBy }
                className={ classes.infoUser }
              />
              <ListItemText
                primary={ formatBackDateTimeToFriendlyFormat(updatedAt) }
                className={ classes.infoDate }
              />
              <ListItemText
                primary={ updatedFields }
                className={ classes.infoChanges }
              />
            </ListItem>
          ))
        }
      </List>
    </CustomAccordion>
  )
}

HistoricAccordion.propTypes = { workflow: PropTypes.object.isRequired }

export default HistoricAccordion
