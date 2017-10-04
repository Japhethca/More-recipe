const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [path.join(__dirname, './client/index.js'),
    // path.join(__dirname, 'client/scss/style.scss')
  ],
  output: {
    filename: 'bundle.js'

  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, './client'),
          path.join(__dirname, 'server/inputValidators')],
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ],
  },
  resolve: {
    extensions: [' ', '.js']
  },
  node: {
    net: 'empty',
    dns: 'empty'
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ]

};
