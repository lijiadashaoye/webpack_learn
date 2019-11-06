const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: { //入口
        main: "./build/index.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: process.env.NODE_ENV,
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        alias: { // 定义文件读取路径快捷名称
            assets: './../assets',
            src: './../src',
        }
    }
}