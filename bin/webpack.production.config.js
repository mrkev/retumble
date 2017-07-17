const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = working_dir => {

  const working_dir_modules = path.resolve("node_modules")
  const spur_modules = path.resolve(path.join(__dirname, '../node_modules'))
  const modules = [
    // Spur's node_modules
    spur_modules,

    // Blog's node_modules
    working_dir_modules,

    // Default behaviour as fallback
    "node_modules"
  ]

  return {
    entry: path.join(__dirname, 'index.jsx'),

    resolve: { modules },
    resolveLoader: { modules },

    output: {
      path: path.join(working_dir, 'static'),
      filename: 'bundle.js',
      publicPath: '/static/',
    },
    plugins: [
      new ProgressBarPlugin(),
      // new webpack.optimize.OccurrenceOrderPlugin(),
      // new webpack.optimize.UglifyJsPlugin(),
      // new webpack.optimize.DedupePlugin()
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
  }
}
