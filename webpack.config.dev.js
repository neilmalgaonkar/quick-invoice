var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var dotenv = require('dotenv')

var stats = fs.statSync('.env');
if(stats.isFile()) {
    dotenv.config()
} else {
    throw new Error(".env is missing")
}

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        './client/quickinvoice'
    ],
    output: {
    path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            _GENERATE_PDF_: JSON.stringify(process.env.GENERATE_PDF)
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
