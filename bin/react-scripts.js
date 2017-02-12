#!/usr/bin/env node
const spawn = require('cross-spawn')
const script = process.argv[2]
const args = process.argv.slice(3)
const paths = require('../config/paths.js')

const launch = (script) => {
  const result = spawn.sync(
    'node',
    [require.resolve(script)].concat(args),
    {stdio: 'inherit'}
  )
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
      )
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
      )
    }
    process.exit(1)
  }
  process.exit(result.status)
}

switch (script) {
case 'build':
case 'component':
case 'eject':
case 'start':
case 'test':
  launch('../scripts/' + script)
  break
case 'storybook':
  launch(`${paths.appNodeModules}/@kadira/storybook/dist/server/index.js`)
  break
case 'build-storybook':
  launch(`${paths.appNodeModules}/@kadira/storybook/dist/build.js`)
  break
default:
  console.log('Unknown script "' + script + '".')
  console.log('Perhaps you need to update react-scripts?')
  break
}
