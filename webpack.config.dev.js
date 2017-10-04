import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'eval-source-map',
  entry: [path.join(__dirname, './client/index.js'),
    // path.join(__dirname, 'client/scss/style.scss')
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js'

  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, './client')],
        loaders: ['babel-loader'],
      },
      {

        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')

      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=25000'
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
    new ExtractTextPlugin('../style.css', {
      allChunks: true
    })
  ]

};
