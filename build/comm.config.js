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
    resolve: {
        alias: { // 定义文件读取路径快捷名称
            assets: path.resolve(__dirname, './../assets/'),
            src: path.resolve(__dirname, './../src/'),
        }
    }
}