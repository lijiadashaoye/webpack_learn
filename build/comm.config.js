const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: { //入口
        main: "./build/index"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: process.env.NODE_ENV,
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({ // 定义项目中使用的库的别名
            bb: 'lodash',
            $: 'jquery'
        })
    ],
    // __dirname 是被执行的js 文件的地址 ——文件所在目录
    // process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录
    
    resolve: {
        alias: { // 定义文件读取路径快捷名称，两种写法都可以
            assets: path.resolve(process.cwd(), 'assets'),
            src: './../src',
        },
        // 引用文件时，不用写对应的后缀名
        extensions: ['.js', '.ts', '.vue', '.tsx', '.json'],
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