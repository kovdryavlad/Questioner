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

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,    //    /\.js$/
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
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
        from: './assets/',
        
      }
    ])   
  ]
}