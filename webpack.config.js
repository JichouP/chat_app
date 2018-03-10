const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
  entry: './src/server.js',
  output: {
    path: path.resolve('public'),
    filename: 'server.js'
  },
  module: {
    rules: [{
      test: /src\/.*\.js$/,
      loader: 'eslint-loader',
      options: {
        failOnError: true
      }
    }]
  },
  target: 'node',
  externals: [nodeExternals()]
};

const clientConfig = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /src\/.*\.js$/,
      loader: 'eslint-loader',
      options: {
        failOnError: false
      }
    }]
  },
  devtool: 'source-map',
  target: 'web'
};

module.exports = [serverConfig, clientConfig];
