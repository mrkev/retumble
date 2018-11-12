const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = working_dir => {
  const working_dir_modules = path.resolve("node_modules");
  const retumble_modules = path.resolve(
    path.join(__dirname, "../node_modules")
  );
  const modules = [
    // Retumble's node_modules
    retumble_modules,

    // Blog's node_modules
    working_dir_modules,

    // Default behaviour as fallback
    "node_modules",
  ];

  return {
    resolve: { modules },
    resolveLoader: { modules },

    devtool: "source-map",
    entry: [
      "react-hot-loader/patch",
      "webpack-hot-middleware/client",
      path.join(__dirname, "../lib/index.jsx"),
    ],
    output: {
      path: path.join(working_dir, "static"),
      filename: "bundle.js",
      publicPath: "/static/",
    },

    plugins: [
      // Show compilation progress bar
      new ProgressBarPlugin(),

      // enable HMR globally
      new webpack.HotModuleReplacementPlugin(),

      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),

      // do not emit compiled assets that include errors
      new webpack.NoEmitOnErrorsPlugin(),

      // fix around bug in which postcss expetcs option file in project root
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [],
        },
      }),
      // HMR needs it idk
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": process.env.NODE_ENV,
      }),
    ],

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          include: [path.resolve(__dirname, ".."), path.join(working_dir, ".")],
          query: {
            // presets: ["flow", "env", "react", "stage-0"],

            presets: [
              require.resolve("@babel/preset-flow"),
              require.resolve("@babel/preset-env"),
              require.resolve("@babel/preset-react"),
            ],
            plugins: [
              "react-hot-loader/babel",
              "@babel/plugin-proposal-class-properties",
            ],
          },
        },
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader"],
          //include: [path.resolve(__dirname, '../'), path.join(working_dir, '.')],
        },
      ],
    },
  };
};
/*
 {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?sourceMap&sourceComments',
        ],
      },

      */
