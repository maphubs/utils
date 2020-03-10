// @flow
import getConfig from 'next/config'
const MAPHUBS_CONFIG = getConfig().publicRuntimeConfig

module.exports = {
  getBaseUrl (): string {
    let host, port

    host = MAPHUBS_CONFIG.host
    port = MAPHUBS_CONFIG.port

    let proto = 'http://'
    if (MAPHUBS_CONFIG.https) proto = 'https://'
    let url = proto + host
    if (port !== 80) {
      url += ':' + port
    }
    return url
  }
}
