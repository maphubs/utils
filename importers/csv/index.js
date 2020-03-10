// @flow
const { csv2geojson } = require('csv2geojson')
const fileEncodingUtils = require('../../file-encoding-utils')
const util = require('util')
const csv2geo = util.promisify(csv2geojson)

module.exports = async function (filePath: string, layer_id: number, config?: Object) {
  const data = fileEncodingUtils.getDecodedFileWithBestGuess(filePath)
  const geoJSON = await csv2geo(data)
  if (geoJSON) {
    return geoJSON
  } else {
    throw new Error('Failed to parse CSV for layer: ' + layer_id)
  }
}
