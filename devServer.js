var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var Promise = require('bluebird').Promise;

var fsSync = Promise.promisifyAll(require('fs'));

fsSync.statAsync('./config.js')
    .then(function(stat) {
        var siteConfig = require('./config.js');
        runServer(siteConfig);
    })
    .catch(function(err) {
        console.log(`config.js file does not exists!
Please copy default configuration file config.js.example from root of the project`);
    });

function runServer(siteConfig) {
    var app = express();
    var compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));

    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'index.html'));
    });

    app.listen(siteConfig.PORT, siteConfig.HOST, function(err) {
      if (err) {
        console.log(err);
        return;
      }

      console.log(`Listening at http://${siteConfig.HOST}:${siteConfig.PORT}`);
    });
}
