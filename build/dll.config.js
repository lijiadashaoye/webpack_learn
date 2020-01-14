const path = require('path');
const webpack = require('webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// 用于提取公共库
module.exports = {
    mode: 'production',
    entry: {
        lodash: ['lodash'],
        jquery: ['jquery']
    },
    output: {
        path: path.resolve(process.cwd(), 'dll'),
        filename: '[name].js',
        library: '[name]',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({ // 打包公共文件并生成分析文件
            path: path.resolve(process.cwd(), 'dll/[name].manifest.json'),
            name: '[name]',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            // 最小化js代码插件，以前用 UglifyJsPlugin插件
            // 默认删除代码里的所有注释
            // 默认没有排除，全部最小化
            new TerserPlugin({ // 最小化js代码插件
                terserOptions: {
                    output: {
                        comments: false, // false时，执行删除代码里的所有注释，要与 extractComments 一起用
                    },
                },
                extractComments: false, // 是否将注释提取到单独的文件中，为ture会单独生成注释文件
            })
        ],
    },
};