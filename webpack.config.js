let webpack = require('webpack');
let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'dist/app.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.woff2?$/,
        loader: 'base64-font-loader'
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watch: true,
  plugins: [
    new CleanWebpackPlugin('./dist'),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: process.cwd()
      }
    })
  ]
};
