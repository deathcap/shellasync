'use strict';

const fs = require('fs');
const path_join = require('path').join;

function defaultCB(err, data) {
  console.log(err, data);
}

function fixpath(path) {
  if (path === undefined) return pwd(); // empty is current working directory
  else if (path.charAt(0) === '/') return path; // absolute
  else return path_join(pwd(), path); // relative to process.env.PWD
}

function pwd() {
  return process.env.PWD;
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

    const path = fixpath(paths[i]);

    fs.readFile(path, 'utf8', (err, data) => saveData(i, err, data));
  }
}

function readlink(path, cb) {
  if (!cb) cb = defaultCB;
  path = fixpath(path);

  fs.readlink(path, cb);
}

function chmod(path, mode, cb) {
  if (!cb) cb = defaultCB;
  path = fixpath(path);

  fs.chmod(path, mode, cb);
}

function chown(path, uid, gid, cb) {
  if (!cb) cb = defaultCB;
  path = fixpath(path);

  fs.chown(path, uid, gid, cb);
}

function cd(path, cb) {
  if (!cb) cb = defaultCB;
  if (path === undefined) path = process.env.HOME; // cd with no path changes to HOME, not PWD
  path = fixpath(path);

  fs.lstat(path, (err, stats) => {
    if (err) cb(null, err);
    process.env.PWD = path;
    cb(path);
  });
}

function ls(path, cb) {
  if (!cb) cb = defaultCB;
  path = fixpath(path);

  fs.readdir(path, cb);
}

function mv(oldPath, newPath, cb) {
  if (!cb) cb = defaultCB;
  oldPath = fixpath(oldPath);
  newPath = fixpath(newPath);

  fs.rename(oldPath, newPath, cb);
}

function rmdir(path, cb) {
  if (!cb) cb = defaultCB;
  path = fixpath(path);
  
  fs.rmdir(path, cb);
}

function stat(path, cb) {
  if (!cb) cb = defaultCB;
  path = fixpath(path);

  fs.lstat(path, cb);
}

function ln(path, target, cb) {
  if (!cb) cb = defaultCB;
  path = fixpath(path);
  target = fixpath(target);

  fs.symlink(target, path, cb);
}

function rm(path, cb) {
  if (!cb) cb = defaultCB;
  path = fixpath(path);

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
