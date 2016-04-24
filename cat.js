'use strict';

const fs = require('fs');

function logCB(err, data) {
  console.log(err, data);
}

function cat(paths, cb) {
  if (!cb) cb = logCB;
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

module.exports = cat;
