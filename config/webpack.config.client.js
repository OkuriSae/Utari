const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './src/client/index.js',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  target: 'web',
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
  externals: [],
  plugins: [],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.svelte'],
  },
};
