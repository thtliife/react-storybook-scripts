#!/usr/bin/env node
const spawn = require('cross-spawn');
const script = process.argv[2];
const args = process.argv.slice(3);

const launch = (script) => {
  const result = spawn.sync(
    'node',
    [require.resolve(script)].concat(args),
    {stdio: 'inherit'}
  );
  process.exit(result.status);
}

switch (script) {
case 'build':
case 'component':
case 'eject':
case 'start':
case 'test':
  launch('../scripts/' + script)
  break;
case 'storybook':
  launch('../node_modules/@kadira/storybook/dist/server/index.js')
  break;
case 'build-storybook':
  launch('../node_modules/@kadira/storybook/dist/build.js')
  break;
default:
  console.log('Unknown script "' + script + '".');
  console.log('Perhaps you need to update react-scripts?');
  break;
}
