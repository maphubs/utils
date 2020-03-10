// @flow
const csv = require('./csv')
console.log('loaded CSV importer')
const shapefile = require('./shapefile')
console.log('loaded Shapefile')
const kml = require('./kml')
console.log('loaded KML importer')
const geojson = require('./geojson')
console.log('loaded GeoJSON importer')
const gpx = require('./gpx')
console.log('loaded GPX importer')
const geobuf = require('./geobuf')
console.log('loaded GeoBuf importer')
const debug = require('../debug')('importers')

module.exports = {
  csv,
  shapefile,
  kml,
  geojson,
  gpx,
  geobuf,
  getImporterFromFileName (fileName: string) {
    if (fileName.endsWith('.zip')) {
      debug.log('Zip File Detected')
      return shapefile
    } else if (fileName.endsWith('.pbf')) {
      debug.log('Geobuf File Detected')
      return geobuf
    } else if (fileName.endsWith('.maphubs')) {
      debug.log('MapHubs File Detected')
      return geobuf
    } else if (fileName.endsWith('.csv')) {
      debug.log('CSV File Detected')
      return csv
    } else if (fileName.endsWith('.kml')) {
      debug.log('KML File Detected')
      return kml
    } else if (fileName.endsWith('.kmz')) {
      debug.log('KMZ File Detected')
      return kml
    } else if (fileName.endsWith('.gpx')) {
      debug.log('GPX File Detected')
      return gpx
    } else if (fileName.endsWith('.geojson') || fileName.endsWith('.json')) {
      debug.log('GeoJSON File Detected')
      return geojson
    } else if (fileName.endsWith('.shp')) {
      throw new Error('Shapefile must uploaded in a Zip file')
    } else {
      throw new Error(`Unsupported file type: ${fileName}`)
    }
  }
}
