const shajs = require('sha.js');

/**
 * Create a hash data
 * @param {string} data
 * @returns {string} Hash
 */
const createHash = data =>
  shajs('sha256')
    .update(data)
    .digest('hex');

module.exports = createHash;