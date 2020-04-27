// @flow
import getConfig from 'next/config'
const config =  getConfig()
let mapHubsConfig = {}
if (config && config.publicRuntimeConfig) {
  mapHubsConfig = config.publicRuntimeConfig
}

module.exports = {
  getBaseUrl (): string {
    let host, port

    host = mapHubsConfig.host
    port = mapHubsConfig.port

    let proto = 'http://'
    if (mapHubsConfig.https) proto = 'https://'
    let url = proto + host
    if (port !== 80) {
      url += ':' + port
    }
    return url
  }
}
