import React, { useMemo, useCallback } from 'react'

import PropTypes from 'prop-types'

import uniqueId from 'lodash/uniqueId'

import { useT } from '@britania-crm/i18n'
import Button from '@britania-crm/web-components/Button'
import UploadSVG from '@britania-crm/web-components/Icons/Upload'

import useStyles, { AddNewImage, AddNewImageDesc, Container } from './styles'

const DropzoneFile = ({ handleUpload, types, title, description }) => {
  const uniqId = useMemo(() => uniqueId(), [])
  const t = useT()
  const classes = useStyles()

  const dragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const dragEnter = useCallback((e) => {
    e.preventDefault()
  }, [])

  const dragLeave = useCallback((e) => {
    e.preventDefault()
  }, [])

  const fileDrop = useCallback(
    (e) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length) {
        handleUpload(files)
      }
    },
    [handleUpload]
  )

  return (
    <Container
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      <UploadSVG />
      <AddNewImage>{title}</AddNewImage>
      <AddNewImageDesc>
        {t('drag n drop to add')}
        <br />
        {description}
      </AddNewImageDesc>
      <input
        accept={types}
        style={{ display: 'none' }}
        id={uniqId}
        type='file'
        onChange={(e) => handleUpload(e.target.files)}
      />
      <label htmlFor={uniqId}></label>
    </Container>
  )
}
DropzoneFile.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  types: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

DropzoneFile.defaultProps = {
  handleUpload() {},
  types: 'image/png, image/jpg, image/jpeg, image/gif'
}

export default DropzoneFile
