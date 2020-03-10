// @flow
const fs = require('fs')
const ogr2ogr = require('ogr2ogr')
const debug = require('../../debug')('importers/kml')

module.exports = async function (filePath: string, layer_id: number, config?: Object) {
  debug.log(`importing KML for layer: ${layer_id}`)
  /* eslint-disable security/detect-non-literal-fs-filename */
  // file path is a folder from a env var + a GUID, not orginal filename
  const geoJSON = await ogr2ogr(filePath, 'KML')
    .format('GeoJSON')
    .skipfailures()
    .options(['-t_srs', 'EPSG:4326'])
    .timeout(60000)
    .promise()

  return geoJSON
}
