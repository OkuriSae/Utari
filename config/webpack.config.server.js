const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    app: './src/server/app',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // Transpiles ES6-8 into ES5
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
        },
      }
    ],
  },
  externals: [nodeExternals()],
  plugins: [],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.svelte'],
  },
};
