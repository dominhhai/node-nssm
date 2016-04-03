const nssm = require('./nssm')
const cmdMap = {
  install: install,
  remove: remove,
  start: nssm.start,
  stop: nssm.stop,
  restart: nssm.restart
}

var cmd = process.argv[2] || 'install'
if (cmdMap.hasOwnProperty(cmd)) {
  cmdMap[cmd]()
} else {
  console.error(cmd, 'is NOT a valid action')
}

function install () {
  nssm.install(function (err) {
    if (!err) cmdMap.start()
  })
}

function remove () {
  cmdMap.stop(function (err) {
    nssm.remove()
  })
}
