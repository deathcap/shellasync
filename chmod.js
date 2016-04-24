'use strict';

const fs = require('fs');

function chmod(path, mode, cb) {
  if (!cb) cb = require('./defaultcb');

  fs.chmod(path, mode, cb);
}

module.exports = chmod;
