var path = require('path');
var webpack = require('webpack');
var package = require('./package.json');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'barba.js',
    library: 'Barba',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    pathinfo: false,
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: [ 'babel-loader', 'eslint-loader' ] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(package.version)
    })
  ]
}
