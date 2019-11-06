const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: { //入口
        main: path.resolve(__dirname, "./index.js")
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: process.env.NODE_ENV,
        }),
        new CleanWebpackPlugin(),
    ],

}