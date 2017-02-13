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
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      // include: __dirname,
      include: [path.resolve(__dirname, '..'), path.join(working_dir, '.')],
      query: {
        presets: ["es2015", "stage-0", "react"],
      },
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader",
      //include: __dirname,
      include: [path.join(working_dir, '.')],
    }]
  }
})
