'use strict';

const fs = require('fs');

function chown(path, uid, gid, cb) {
  if (!cb) cb = require('./defaultcb');

  fs.chown(path, uid, gid, cb);
}

module.exports = chown;
