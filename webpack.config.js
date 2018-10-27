// Webpack v4
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { main: './javascript/main.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(
      {filename: 'style.css'}
    ),

    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),

    new CopyWebpackPlugin([
      {
        from: './javascript/QAapp/QAappConfig.json',
        //to: 'config.json',  //это переименует файл
        //toType: 'file'
      },
      {
        from: './assets/',
        
      }
    ])   
  ]
}