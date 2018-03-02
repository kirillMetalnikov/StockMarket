var webpack = require('webpack');
var path = require('path');
var src = path.resolve(__dirname, 'src');
var output = path.resolve(__dirname);
var config = {
  entry: src + '/index.js',
  output: {
    path: output,
    filename: 'client.js'
  },
  module: {
    loaders: [{
      include: src,
      loader: 'babel-loader',
    }]
  }
};

module.exports = config;
