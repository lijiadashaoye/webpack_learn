const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: { //入口
        main: "./build/index.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: process.env.NODE_ENV,
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({ //
            bb: 'lodash',
            $: 'jquery'
        })
    ],
    resolve: {
        alias: { // 定义文件读取路径快捷名称，两种写法都可以
            assets: path.resolve(process.cwd(), 'assets'),
            src: './../src',
        }
    },
    optimization: {
        splitChunks: { // 代码分割
            chunks: 'all', // 规定可以匹配的引入（import）文件的方式（同步initial、异步async）
        },
        runtimeChunk: { // 兼容老版本webpack，使打包时contenthash起作用
            name: 'runtime'
        }
    },
}