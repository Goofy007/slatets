/**
 * Offset key parser regex.
 *
 * @type {RegExp}
 */

const PARSER = /^([\w-]+)(?::(\d+))?$/

/**
 * Parse an offset key `string`.
 *
 * @param {String} string
 * @return {Object}
 */

function parse(string) {
  const matches = PARSER.exec(string)

  if (!matches) {
    throw new Error(`Invalid offset key string "${string}".`)
  }
  // tslint:disable-next-line:no-unused-variable
  const [original, key, index] = matches;
  console.log(original)
  return {
    key,
    index: parseInt(index, 10),
  }
}

/**
 * Stringify an offset key `object`.
 *
 * @param {Object} object
 *   @property {String} key
 *   @property {Number} index
 * @return {String}
 */

function stringify(object) {
  return `${object.key}:${object.index}`
}

/**
 * Export.
 *
 * @type {Object}
 */

export default {
  parse,
  stringify,
}
