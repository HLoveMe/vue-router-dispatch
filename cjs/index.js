'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./pin.cjs.prod.js');
} else {
  module.exports = require('./pin.cjs.dev.js');
}
