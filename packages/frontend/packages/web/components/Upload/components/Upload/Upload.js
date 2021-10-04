import React from 'react'

import { useT } from '@britania-crm/i18n'
import colors from '@britania-crm/styles/colors'
import Button from '@britania-crm/web-components/Button'
import UploadSVG from '@britania-crm/web-components/Icons/Upload'

import { useFile } from '../../context/Files'
import useStyles from './styles'

const Upload = () => {
  const t = useT()
  const { handleUpload } = useFile()
  const classes = useStyles()

  const dragOver = (e) => {
    e.preventDefault()
  }

  const dragEnter = (e) => {
    e.preventDefault()
  }

  const dragLeave = (e) => {
    e.preventDefault()
  }

  const fileDrop = (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length) {
      handleUpload(files)
    }
  }

  return (
    <div
      onDragOver={ dragOver }
      onDragEnter={ dragEnter }
      onDragLeave={ dragLeave }
      onDrop={ fileDrop }
    >
      <UploadSVG />
      <p style={ {
        marginBottom: '0px',
        marginTop: '0px',
        fontSize: '22px',
        fontWeight: '500',
        justifyContent: 'center'
      } }
      >{ t('login image add new file message') }
      </p>
      <p style={ {
        textAlign: 'center',
        marginTop: '0px',
        marginBottom: '23px',
        fontSize: '14px',
        color: colors.britSupport1.base
      } }
      >
        Arraste e solte para adicionar<br />a imagem ou
      </p>
      <input
        accept="image/png, image/jpg, image/jpeg, image/gif"
        style={ { display: 'none' } }
        id="button-file"
        type="file"
        onChange={ handleUpload }
      />
      <label
        htmlFor="button-file"
      >
        <Button
          className={ classes.selectButton }
          component="span"
          color="secondary"
        >
          { t('login image add new file') }
        </Button>
      </label>
    </div>
  )
}

export default Upload
