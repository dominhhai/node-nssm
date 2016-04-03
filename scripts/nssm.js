const exec = require('child_process').exec
const path = require('path')
const serviceName = require('../config/config').winservice
const nssm = path.resolve(__dirname, 'nssm.exe')

function run (opts, cb) {
  runCmd(joinOpts(nssm, opts), cb)
}

function install (cb) {
  var nodePath = process.execPath
  var www = path.resolve(__dirname, '..', 'bin/www')
  var cmd = joinOpts(nssm, 'install', serviceName, nodePath, www)

  runCmd(cmd, function (err) {
    if (err) {
      console.error('Can NOT install', serviceName, '. Please try again.')
    } else {
      console.log(serviceName, 'is installed')
    }
    if (cb) cb(err)
  })
}

function remove (cb) {
  var cmd = joinOpts(nssm, 'remove', serviceName, 'confirm')

  runCmd(cmd, function (err) {
    if (err) {
      console.error('Can NOT remove', serviceName, '. Please try again.')
    } else {
      console.log(serviceName, 'is removed')
    }
    if (cb) cb(err)
  })
}

function start (cb) {
  var cmd = joinOpts(nssm, 'start', serviceName)

  runCmd(cmd, function (err) {
    if (err) {
      console.error('Can NOT start', serviceName, '. Please try again.')
    } else {
      console.log(serviceName, 'is stared')
    }
    if (cb) cb(err)
  })
}

function stop (cb) {
  var cmd = joinOpts(nssm, 'stop', serviceName)

  runCmd(cmd, function (err) {
    if (err) {
      console.error('Can NOT stop', serviceName, '. Please try again.')
    } else {
      console.log(serviceName, 'is stopped')
    }
    if (cb) cb(err)
  })
}

function restart (cb) {
  var cmd = joinOpts(nssm, 'restart', serviceName)

  runCmd(cmd, function (err) {
    if (err) {
      console.error('Can NOT restart', serviceName, '. Please try again.')
    } else {
      console.log(serviceName, 'is restared')
    }
    if (cb) cb(err)
  })
}

function runCmd (cmd, cb) {
  exec(cmd, function (err, stdout, stderr) {
    console.log('run:', cmd)
    if (err) {
      console.error('exec error:', err)
      return cb(err)
    }
    console.log(stdout)
    console.log(stderr)

    cb(null, stdout, stderr)
  })
}

function joinOpts () {
  return Array.prototype.map.call(arguments, function (val, index) {
    return (index < 2) ? val : wrapOpt(val)
  }).join(' ')
}

function wrapOpt (opt) {
  return '"' + opt + '"'
}

exports = module.exports = run
exports.install = install
exports.remove = remove
exports.start = start
exports.stop = stop
exports.restart = restart
