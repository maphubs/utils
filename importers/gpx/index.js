// @flow
const fs = require('fs')
const ogr2ogr = require('ogr2ogr')
const debug = require('../../debug')('importers/gpx')

module.exports = async function (filePath: string, layer_id: number, config?: Object) {
  /* eslint-disable security/detect-non-literal-fs-filename */
  // file path is a folder from a env var + a GUID, not orginal filename
  let geoJSON = await ogr2ogr(fs.createReadStream(filePath), 'GPX')
    .format('GeoJSON').skipfailures()
    .options(['-t_srs', 'EPSG:4326', '-sql', 'SELECT * FROM tracks'])
    .timeout(60000)
    .promise()
  if (geoJSON.features && geoJSON.features.length === 0) {
    debug.log('No tracks found, loading waypoints')
    geoJSON = await ogr2ogr(fs.createReadStream(filePath), 'GPX')
      .format('GeoJSON').skipfailures()
      .options(['-t_srs', 'EPSG:4326', '-sql', 'SELECT * FROM waypoints'])
      .timeout(60000)
      .promise()
  } 
  if (config && config.writeDebugData) {
    fs.writeFile(config.tempFilePath + '/gpx-upload-layer-' + layer_id + '.geojson', JSON.stringify(geoJSON), (err) => {
      if (err) {
        throw err
      }
    })
  }
  return geoJSON
}
