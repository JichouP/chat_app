const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
  entry: path.resolve('src') + '/server/server.js',
  output: {
    path: path.resolve('public'),
    filename: 'server.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: [["env", {
          "targets": {
            "node": "9.3.0",
          }
        }]]
      }
    }]
  },
  // optimization: {
  //   minimize: true,
  // },
  target: 'node',
  externals: [nodeExternals()]
};

const clientConfig = {
  entry: path.resolve('src') + '/index.jsx',
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      options: {presets: ["env", "react"]}
    }]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  // optimization: {
  //   minimize: true,
  // },
  devtool: 'source-map',
  target: 'web'
};

module.exports = [serverConfig, clientConfig];
