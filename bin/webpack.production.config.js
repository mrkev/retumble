var path = require('path');
var webpack = require('webpack');

module.exports = working_dir => ({
  entry: path.join(__dirname, 'index.jsx'),
  output: {
    path: path.join(working_dir, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: [path.resolve(__dirname, '..'), path.join(working_dir, '.')],
      query: {
        presets: ["es2015", "stage-0", "react"],
      },
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader",
      include: [path.resolve(__dirname, '..'), path.join(working_dir, '.')],
    }]
  }
})
