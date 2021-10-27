import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'

const secret = process.env.REACT_APP_SECRET_KEY

export const encode = (message) => AES.encrypt(message, secret)

export const decode = (message) => {
  const bytes = AES.decrypt(message, secret)

  return bytes.toString(Utf8)
}
