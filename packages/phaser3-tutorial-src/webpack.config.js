// Webpack v4
const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { main: './javascript/index.js' },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 5050
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      
      {
        test: [ /\.vert$/, /\.frag$/ ],
        use: 'raw-loader'
      },
      

      {
        test: /\.(js)$/,    //    /\.js$/
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),

    new CopyWebpackPlugin([
      {
        from: './assets/',
        
      }
    ]),
    
    /*
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    })
    */
  ]
}