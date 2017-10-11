
const webpack = require('webpack');


const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    './client/index.js'
  ],

  // Production details
  output: {
    // When compiled for production, output file location
    path: path.join(__dirname, './public'),
    publicPath: '/',
    filename: 'bundle.js' // Its convention to use this name
  },

  // Bundle lookup dir for included/imported modules
  // By default, bundler/webpack with search here for the scripts
  resolve: {
    // modulesDirectories: ['node_modules', 'src'],
    extensions: [' ', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, './client')],
        loaders: ['babel-loader'],
      },
      // I am using SASS as Transpiler for style sheets
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
    new webpack.DefinePlugin({
      'process.env': {
        // This tells the Webpack and Babel for optimization for performance
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // Makes sure Webpack will not compile if Errors
  ]
};
