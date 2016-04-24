'use strict';

const fs = require('fs');

function readlink(path, cb) {
  if (!cb) cb = require('./defaultcb');
  fs.readlink(path, cb);
}

module.exports = readlink;
