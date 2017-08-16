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
            test: /\.less$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
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
        test: /\.(png|jpg|otf)$/,
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
