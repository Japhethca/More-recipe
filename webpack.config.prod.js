const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();


module.exports = {
  devtool: 'source-map',
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
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')

      },
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        CLOUDINARY_NAME: JSON.stringify(process.env.CLOUDINARY_NAME),
        CLOUDINARY_PRESETS: JSON.stringify(process.env.CLOUDINARY_PRESETS),
        CLOUDINARY_API_KEYS: JSON.stringify(process.env.CLOUDINARY_API_KEYS),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: true,
      minimize: false
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('./style.css', {
      allChunks: true
    })
  ]
};
