const path = require("path");

const SOURCE_DIR = path.join(__dirname, "src");
const PUBLIC_DIR = path.join(__dirname, "public");

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
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
        loader: 'null'
      },
      {
        test: /\.css$/,
        exclude: path.join(SOURCE_DIR, 'app'),
        loader: 'raw'
      },
      {
        test: /\.css$/,
        include: path.join(SOURCE_DIR, 'app'),
        loader: 'raw'
      }
    ]
  }
}