export const downloadBlobFile = (blob, name = '') => {
  // Create a link element
  const link = document.createElement('a')

  // Set link's href to point to the Blob URL
  link.href = `${ process.env.REACT_APP_URL_DOWNLOAD_FILE + encodeURIComponent(blob) }`
  link.download = name

  // Append link to the body
  document.body.appendChild(link)

  // Dispatch click event on the link
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  )

  // Remove link from body
  document.body.removeChild(link)
}
