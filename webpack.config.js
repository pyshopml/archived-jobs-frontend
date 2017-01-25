const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const SOURCE_DIR = path.join(__dirname, "src");
const PUBLIC_DIR = path.join(__dirname, "public");

module.exports = {
  entry: {
    main: path.join(SOURCE_DIR, "main.ts"),
    vendor: path.join(SOURCE_DIR, "vendor.ts"),
    polyfills: path.join(SOURCE_DIR, 'polyfills.ts')
  },
  output: {
    path: PUBLIC_DIR,
    filename: "[name].bundle.js"
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new FaviconsWebpackPlugin('./src/favicon.png'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin("styles.css")
  ],
  htmlLoader: {
    minimize: false
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
  },
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
        query : {
          presets : ['es2015']
        }
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader!angular2-template-loader'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.(css|styl)$/,
        exclude: path.join(SOURCE_DIR, 'app'),
        loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!stylus-loader')
      },
      {
        test: /\.(css|styl)$/,
        include: path.join(SOURCE_DIR, 'app'),
        loader: 'raw!stylus-loader'
      }
    ]
  }
};
