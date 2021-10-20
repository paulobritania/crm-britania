import React, {
  useCallback,
  useMemo
} from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import isArray from 'lodash/isArray'
import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import { Scope } from '@britania-crm/forms'
import {
  VALUES_NAME,
  INITIAL_VALUES_DOCUMENTS
} from '@britania-crm/forms/schemas/customer/documents.schema'
import { useT } from '@britania-crm/i18n'
import { CustomerActions } from '@britania-crm/stores/customer'
import ButtonUploadFile from '@britania-crm/web-components/ButtonUploadFile'
import IconButton from '@britania-crm/web-components/IconButton'
import InfoIcon from '@britania-crm/web-components/Icons/infoIcon'
import Tooltip from '@britania-crm/web-components/Tooltip'

import useStyles from './styles'

const Documents = ({ disabled, handleDocumentation }) => {
  const classes = useStyles()
  const t = useT()
  const dispatch = useCallback(useDispatch(), [])

  const fileTypes = useMemo(
    () => [
      'application/pdf',
      'video/*',
      'image/*',
      '.csv',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx'
    ],
    []
  )

  const onDownloadClick = useCallback(
    (_, row) => {
      dispatch(CustomerActions.downloadFileCustomer(row?.path, row?.filename))
    },
    [dispatch]
  )

  return (
    <Scope path="documents">
      <Grid container spacing={ 1 }>
        <Grid item sm={ 12 } className={ classes.iconInfo }>
          {handleDocumentation && (
            <Tooltip title={ t('documentation', { howMany: 1 }) } arrow>
              <IconButton color="care" onClick={ handleDocumentation } >
                <InfoIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
        {map(VALUES_NAME, ({
          name, label, max
        }) => (
          <Grid item sm={ 12 } md={ 6 } key={ name }>
            <ButtonUploadFile
              label={ t(label) }
              buttonLabel={ t('click here to select the attachment') }
              className={ classes.addButtonFile }
              variant="contained"
              isLoading={ false }
              disabled={ disabled }
              types={ fileTypes }
              name={ name }
              toDownload={ onDownloadClick }
              multiple={ isArray(INITIAL_VALUES_DOCUMENTS[name]) }
              max={ max }
            />
          </Grid>
        ))}
      </Grid>
    </Scope>
  )
}

Documents.propTypes = { disabled: PropTypes.bool.isRequired, handleDocumentation: PropTypes.func.isRequired }

export default Documents
