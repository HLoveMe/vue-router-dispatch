'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/pin.cjs.prod.js');
} else {
  module.exports = require('./cjs/pin.cjs.dev.js');
}
