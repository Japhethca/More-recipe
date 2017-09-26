'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  devtool: 'eval-source-map',
  entry: [_path2.default.join(__dirname, '../client/index.js')],
  output: {
    path: '/'

  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [_path2.default.join(__dirname, '../client'), _path2.default.join(__dirname, 'server/inputValidators')],
      loaders: ['babel-loader']
    }]
    /* rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ loader: 'css-loader?importLoaders=1', }),
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ] */
  },
  resolve: {
    extensions: [' ', '.js']
  }, /* 
     plugins: [
     new ExtractTextPlugin({ filename: 'client/css/main.css', allChunks: true, }),
     ], */
  node: {
    net: 'empty',
    dns: 'empty'
  }

};