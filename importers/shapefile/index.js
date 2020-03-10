// @flow
const log = require('../../log')
const fs = require('fs')
const ogr2ogr = require('ogr2ogr')
const debug = require('../../debug')('importers/shapefile')
const JSONStream = require('JSONStream')

const streamCloseToPromise = function (stream) {
  return new Promise((resolve, reject) => {
    stream.on('close', resolve)
    stream.on('error', reject)
  })
}

module.exports = async function (filePath: string, layer_id: number, config?: Object) {
  /* eslint-disable security/detect-non-literal-fs-filename */
  // file path is a folder from a env var + a GUID, not orginal filename
  log.info('Starting Shapefile Importer')

  debug.log('shapefile: ' + filePath)
  const ogr = ogr2ogr(filePath)
    .format('GeoJSON')
    .skipfailures()
    .options(['-t_srs', 'EPSG:4326'])
    .timeout(1200000)
    .onStderr(function(data) {
      console.log(data)
    })
    .stream()

  return new Promise((resolve, reject) => {
    ogr.on('error', (err) => {
      reject(err)
    })
    ogr.on('close', (code) => {
      if (code === 1) reject(new Error('unknown OGR2OGR error'))
    })
    const stream = ogr.pipe(JSONStream.parse('features.*'))
    const features = []

    stream.on('data', (data) => {
      features.push(data)
    })

    stream.on('end', () => {
      debug.log('Shapefile Conversion to GeoJSON Successful')
      log.info(`Converted ${features.length} features to GeoJSON`)
      resolve({
        type: 'FeatureCollection',
        features
      })
    })
    stream.on('error', (err) => {
      reject(err)
    })
    stream.on('close', function(code) {
      if (code === 1) reject(new Error('OGR2OGR error'))
    })
  })
}
