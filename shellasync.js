'use strict';

const fs = require('fs');

function defaultCB(err, data) {
  console.log(err, data);
}

function cat(paths, cb) {
  if (!cb) cb = defaultCB;
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
  if (!cb) cb = defaultCB;
  fs.readlink(path, cb);
}

function chmod(path, mode, cb) {
  if (!cb) cb = defaultCB;

  fs.chmod(path, mode, cb);
}

function chown(path, uid, gid, cb) {
  if (!cb) cb = defaultCB;

  fs.chown(path, uid, gid, cb);
}

function cd(path, cb) {
  if (!cb) cb = defaultCB;

  if (path === undefined) path = process.env.HOME;

  fs.lstat(path, (err, stats) => {
    if (err) cb(null, err);
    process.env.PWD = path;
    cb(path);
  });
}

function pwd() {
  return process.env.PWD;
}

function ls(path, cb) {
  if (!cb) cb = defaultCB;
  if (path === undefined) path = pwd();

  fs.readdir(path, cb);
}

function mv(oldPath, newPath, cb) {
  if (!cb) cb = defaultCB;

  fs.rename(oldPath, newPath, cb);
}

function rmdir(path, cb) {
  if (!cb) cb = defaultCB;
  
  fs.rmdir(path, cb);
}

function stat(path, cb) {
  if (!cb) cb = defaultCB;

  fs.lstat(path, cb);
}

function ln(path, target, cb) {
  if (!cb) cb = defaultCB;

  fs.symlink(target, path, cb);
}

function rm(path, cb) {
  if (!cb) cb = defaultCB;

  fs.unlink(path, cb);
}

module.exports = {
  cat: cat,
  readlink: readlink,
  chmod: chmod,
  chown: chown,
  pwd: pwd,
  cd: cd,
  ls: ls,
  mv: mv,
  rmdir: rmdir,
  stat: stat,
  ln: ln,
  rm: rm,
};
