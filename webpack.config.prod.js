var path = require('path');
var webpack = require('webpack');

var fs = require('fs');
var dotenv = require('dotenv')

var stats = fs.statSync('.env.prod');
if(stats.isFile()) {
    dotenv.config({
        path: '.env.prod'
    })
} else {
    throw new Error(".env is missing")
}

module.exports = {
  devtool: 'source-map',
  entry: [
    './client/quickinvoice'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      },
      _GENERATE_PDF_: JSON.stringify(process.env.GENERATE_PDF)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    },
    // CSS
    {
      test: /\.styl$/,
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader!stylus-loader'
    }
    ]
  }
};
