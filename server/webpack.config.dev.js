import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'eval-source-map',
  entry: [path.join(__dirname, '../client/index.js'),
    // path.join(__dirname, 'client/scss/style.scss')
  ],
  output: {
    path: '/',
    filename: 'main.js'

  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, '../client'),
          path.join(__dirname, 'server/inputValidators')],
        loaders: ['babel-loader'],
      },
    ],
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
  },/* 
  plugins: [
    new ExtractTextPlugin({ filename: 'client/css/main.css', allChunks: true, }),
  ], */
  node: {
    net: 'empty',
    dns: 'empty'
  }

};
