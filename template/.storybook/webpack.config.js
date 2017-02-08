let genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js')

module.exports = (baseConfig, environment) => {
  let config = genDefaultConfig(baseConfig, environment)
  let autoprefixer = require('autoprefixer')
  config.postcss = () => [
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ]
    }),
    require('postcss-import'),
    require('postcss-nested-vars')
  ]

  return config
}
