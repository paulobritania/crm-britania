
import React from 'react'

import { useT } from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'
import UploadedImageSuccess from '@britania-crm/web-components/Icons/UploadedImageSuccess'

import { useFile } from '../../context/Files'
import useStyles from './styles'

const Success = () => {
  const t = useT()
  const { handleUpload } = useFile()

  const classes = useStyles()

  return (
    <>
      <UploadedImageSuccess />
      <p style={ {
        fontSize: '16px', fontWeight: '400', textAlign: 'center'
      } }
      >{ t('login image preview') }</p>
      <input
        accept="image/*"
        style={ { display: 'none' } }
        id="button-file"
        type="file"
        onChange={ handleUpload }
      />
      <label
        htmlFor="button-file"
      >
        <Button
          variant="outlined"
          component="span"
          className={ classes.button }
        >
          { t('login image new file') }
        </Button>
      </label>
    </>
  )
}

export default Success
