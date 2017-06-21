const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = working_dir => ({
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'index.jsx'),
  ],
  output: {
    path: path.join(working_dir, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    //new webpack.optimize.OccurrenceOrderPlugin(),
    new ProgressBarPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [] // fix around bug in which postcss expetcs option file in project root
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: [path.resolve(__dirname, '..'), path.join(working_dir, '.')],
      query: {
        presets: ["es2015", "stage-0", "react"],
        plugins: ["react-hot-loader/babel"],
      },
    },
    {
      test: /\.css$/,
      loaders: ["style-loader", "css-loader"],
      //include: [path.resolve(__dirname, '../'), path.join(working_dir, '.')],
    }]
  }
})
/*
 {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?sourceMap&sourceComments',
        ],
      },

      */
