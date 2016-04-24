'use strict';

const fs = require('fs');

function cat(paths, cb) {
  if (!cb) cb = require('./defaultcb');
  if (!Array.isArray(paths)) paths = [paths];
  const datas = [];
  datas.length = paths.length;
  let pathsRead = 0;

  for (let i = 0; i < paths.length; ++i) {
    function saveData(i, err, data) {
      pathsRead += 1;
      datas[i] = err ? err : data;

      if (pathsRead === paths.length) {
        cb(null, datas.join(''));
      }
    }

    fs.readFile(paths[i], 'utf8', (err, data) => saveData(i, err, data));
  }
}

function readlink(path, cb) {
  if (!cb) cb = require('./defaultcb');
  fs.readlink(path, cb);
}

function chmod(path, mode, cb) {
  if (!cb) cb = require('./defaultcb');

  fs.chmod(path, mode, cb);
}

function chown(path, uid, gid, cb) {
  if (!cb) cb = require('./defaultcb');

  fs.chown(path, uid, gid, cb);
}

module.exports = {
  cat: cat,
  readlink: readlink,
  chmod: chmod,
  chown: chown,
};
