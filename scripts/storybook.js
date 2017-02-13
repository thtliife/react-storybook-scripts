var spawn = require('cross-spawn');
var args = process.argv.slice(2, 4);
const paths = require('../config/paths.js')

const result = spawn.sync(
  'node',
  [require.resolve(`${paths.appNodeModules}/@kadira/storybook/dist/server/index.js`)].concat(args),
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
