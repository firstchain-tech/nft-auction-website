const CracoLessPlugin = require('craco-less')
const webpack = require('webpack')

const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@theme': '#5927EF',
              '@primary-color': '#5927EF',
              '@border-radius-base': '25px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@': resolve('src'),
    },
    configure: {
      resolve: {
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          assert: require.resolve('assert'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          os: require.resolve('os-browserify'),
          url: require.resolve('url'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      ],
    },
  },
}
