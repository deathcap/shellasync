# shellasync

Asynchronous shell-like functions using Node.js [fs](https://nodejs.org/api/fs.html) API

Usage:

    var shell = require('shellasync');

All commands are async and take an optional callback in the last argument.
If omitted, the default callback will log the results to the console (useful for
interactive usage). Available commands:

* `shell.cat(paths[, cb])`: read files using `fs.readFile()` as text, concatenate together in order
* `shell.readlink(path[, cb])`: read symbolic link target using `fs.readlink()`
* `shell.chmod(path, mode[, cb])`: change file mode permission using `fs.chmod()`
* `shell.chown(path, uid, gid[, cb])`: change file ownership permission using `fs.chown()`
* `shell.ls(path[, cb])`: list directory contents using `fs.readdir()`
* `shell.mv(oldPath, newPath[, cb])`: rename file using `fs.rename()`
* `shell.rmdir(path[, cb])`: remove directory using `fs.rmdir()`
* `shell.stat(path[, cb])`: read file statistics using `fs.lstat()`
* `shell.ln(path, target[, cb)`: create a symbolic link using `fs.symlink()`
* `shell.rm(path[, cb])`: remove a file using `fs.unlink()`

If you want to make the functions available in the global object, you can use `Object.assign(global, require('shellasync'))`.

See also: [shelljs](https://github.com/shelljs/shelljs) - Portable Unix shell commands for Node.js.
shellasync is inspired by shelljs and the feature request
https://github.com/shelljs/shelljs/issues/2 Async versions of all commands,
but is much more primitive and has a different target use case. Instead of writing
JavaScript replacements for shell script commands, shellasync was written for
mostly-interactive console user interaction with the shell via the asynchronous `fs` API,
including non-native Node.js implementations of `fs` (e.g. web-based, remote, etc.).

## License

MIT

