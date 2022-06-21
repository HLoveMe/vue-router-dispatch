'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./esm/pin.esm.prod.js');
} else {
  module.exports = require('./esm/pin.esm.dev.js');
}
