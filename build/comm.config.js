const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');
// 用于向动态生成的html文件内插入标签
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const fs = require('fs');

const currBuildPackName = JSON.parse(process.env.npm_config_argv);
// 可以截取不同的参数来决定怎样打包
console.log(currBuildPackName)

// 读取公共的库
const files = fs.readdirSync(path.resolve(process.cwd(), './dll')),
    pluginsArr = [];

files.forEach(file => {
    if (/.*\.js$/.test(file)) {
        // AddAssetHtmlPlugin 的参数可以是一个对象或者一个对象数组都可以
        pluginsArr.push(new AddAssetHtmlPlugin({
            filepath: path.resolve(process.cwd(), './dll', file)
        }))
    }
    if (/.*\.manifest.json$/.test(file)) {
        // 分析json文件，找到库的映射关系，如果符合映射，就不把库再打包出来
        pluginsArr.push(new webpack.DllReferencePlugin({
            manifest: path.resolve(process.cwd(), './dll', file)
        }))
    }
})

module.exports = {
    entry: { //入口
        main: path.resolve(__dirname, 'index.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), './src/index.html'),
            favicon: path.join(process.cwd(), './assets/images/ico.ico'),
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
            },
            title: 'Webpack Learn' + process.env.NODE_ENV,
            inject: 'body' // 将script标签放到body签底部
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({ // 定义项目中使用的库的别名
            _: 'lodash',
            $: 'jquery'
        }),
        ...pluginsArr,
    ],
    // __dirname 是被执行的js 文件的地址 ——文件所在目录
    // process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录

    resolve: {
        alias: { // 定义文件读取路径快捷名称，两种写法都可以
            assets: path.resolve(process.cwd(), './assets'),
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
                        outputPath: 'assets/images',
                    },
                }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts',
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