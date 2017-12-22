
const webpack = require('webpack');
const path = require('path');


module.exports = {
  devtool: 'eval-source-map',
  entry: [
    './client/index.jsx'
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, './public'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: [' ', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, './client')],
        loaders: ['babel-loader'],
      },

      {
        test: /\.jsx$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread']
        }
      },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=25000'
      },

    ]
  },

  node: {
    net: 'empty',
    dns: 'empty'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};
