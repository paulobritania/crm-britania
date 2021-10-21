
import React from 'react'

import UploadModal from './components/UploadModal/UploadModal'
import { FileProvider } from './context/Files'

const Upload = (props) => (
  <FileProvider { ...props }>
    <UploadModal { ...props }/>
  </FileProvider>
)

export default Upload
