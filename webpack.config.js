const EXTRACT_TEXT_PLUGIN = require('extract-text-webpack-plugin');
const DOTENV_PLUGIN = require('dotenv-webpack');

module.exports = {
  entry: "./src/app.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: EXTRACT_TEXT_PLUGIN.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new EXTRACT_TEXT_PLUGIN("style.css"),
    new DOTENV_PLUGIN({path: './.env'})
  ]
}
