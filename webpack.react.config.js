const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// console.log(path.join(__dirname, '/src/renderer/index.tsx'));

module.exports = {
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    mainFields: ['main', 'module', 'browser'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      assert: false,
      util: false,
      os: false,
      url: false,
      buffer: false,
      dns: false
    }
  },
  entry: {
    bundle: path.join(__dirname, '/src/renderer/index.tsx')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    // Taking our group of files and bundle them into Docketeer.js
    filename: 'Docketeer.js'
  },
  target: ['electron-renderer', 'web'],
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        /** Loading Images
         * /\.(png|svg|jpg|jpeg|gif)$/i -> i is for case-insensitive
         */
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  devServer: {
    // contentBase: path.join(__dirname, './dist/src/renderer'),
    static: {
      directory: path.join(__dirname, '/src/renderer')
    },
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    proxy: {
      '/': {
        target: 'http://localhost:3000/'
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html'
    }),
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
    // new webpack.DefinePlugin({
    //   process: { env: {} }
    // })
  ]
};
