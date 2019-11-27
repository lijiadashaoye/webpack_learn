const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: { //入口
        main: "./build/index"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Learn' + process.env.NODE_ENV,
            favicon: path.resolve(process.cwd(), 'assets/images/ico.ico'),
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
            },
            inject: 'body' // 将script标签放到body签底部
        }),
        new CleanWebpackPlugin(),
        new WebpackCdnPlugin({
            modules: [{
                    name: 'jquery',
                    var: '$',
                    path: 'dist/jquery.min.js'
                },
                {
                    name: 'lodash',
                    var: '_',
                    path: 'lodash.min.js'
                },
            ]
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
    module: {
        rules: [{
                test: /\.(png|jpe?g|gif|bmp)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 设置图片打包阀值，如果超过阀值才会单独打包，否则直接以base64形式写到代码里
                        limit: 1024 * 20, // 30kb
                        name: '[name].[ext]',
                        outputPath: 'images',
                    },
                }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts',
                }
            },
            {
                // npm install -D babel-loader @babel/core @babel/preset-env
                // babel/plugin-transform-runtime 和 babel/preset-env 是babel-loader将ES6语法
                // 转译成ES5语法使用的两个插件，两个只需要使用一个就行，
                // 只不过， babel/plugin-transform-runtime 适用于开发组件或者库的时候使用，防止全局污染，
                // babel/preset-env 是我们在开发一般项目时使用的；
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: [
                    "thread-loader", // 开启一个webworker进行代码转义
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                ['@babel/preset-env']
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime', // 使Babel运行时作为单独的模块，以避免重复。
                            ],
                            cacheDirectory: true // 用于缓存加载程序的结果
                        }
                    }
                ]
            }
        ]
    }
}