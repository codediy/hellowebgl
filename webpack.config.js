const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");  
const webpack = require('webpack'); 

module.exports = {
    devServer: {
        contentBase: require('path').join(__dirname, "dist"),
        compress: true,
        port: 3412,
        host: "127.0.0.1"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
              test: /\.html$/,
              use: [
                {
                  loader: "html-loader",
                  options: { minimize: true }
                }
              ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
  };