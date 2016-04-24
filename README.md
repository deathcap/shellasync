# shellasync

Asynchronous shell-like functions using Node.js [fs](https://nodejs.org/api/fs.html) API

Usage:

    require('shellasync/global');

All commands are async and take an optional callback in the last argument.
If omitted, the default callback will log the results to the console (useful for
interactive usage). Available commands:

* `cat(paths[, cb])`: read files using `fs.readFile()` as text, concatenate together in order
* `readlink(path[, cb])`: read symbolic link target using `fs.readlink()`
* `chmod(path, mode[, cb])`: change file mode permission using `fs.chmod()`
* `chown(path, uid, gid[, cb])`: change file ownership permission using `fs.chown()`
* `pwd()`: returns the current value of `process.env.PWD`
* `cd([path, [, cb]])`: sets the `process.env.PWD` working directory variable to `path` if it exists, or `process.env.HOME` if undefined
* `ls(path[, cb])`: list directory contents using `fs.readdir()`
* `mv(oldPath, newPath[, cb])`: rename file using `fs.rename()`
* `rmdir(path[, cb])`: remove directory using `fs.rmdir()`
* `stat(path[, cb])`: read file statistics using `fs.lstat()`
* `ln(path, target[, cb)`: create a symbolic link using `fs.symlink()`
* `rm(path[, cb])`: remove a file using `fs.unlink()`

All paths can either be absolute if starting with '/', or are otherwise relative to
`process.env.PWD`. The process working directory (as set by `process.chdir()`) is not
used by this module, only `process.env.PWD`.

By default, the global object is extended, for convenience. Alternatively, each command
can be accessed on the shellasync object instead:

    var shell = require('shellasync');

    shell.cat(path, cb); // etc.

See also: [shelljs](https://github.com/shelljs/shelljs) - Portable Unix shell commands for Node.js.
shellasync is inspired by shelljs and the feature request
https://github.com/shelljs/shelljs/issues/2 Async versions of all commands,
but is much more primitive and has a different target use case. Instead of writing
JavaScript replacements for shell script commands, shellasync was written for
mostly-interactive console user interaction with the shell via the asynchronous `fs` API,
including non-native Node.js implementations of `fs` (e.g. web-based, remote, etc.).

## License

MIT

