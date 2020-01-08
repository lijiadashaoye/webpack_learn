const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const comm = require('./comm.config');

// 开发模式
const env = {
    mode: 'development',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        open: true,
        port: 6541,
        hot: true,
        inline: true // “inline”选项会为入口页面添加“热加载”功能
    },
    devtool: 'source-map', // 生产环境最好不用
    plugins: [
        new webpack.HotModuleReplacementPlugin() // 热更新
    ],
    module: {
        rules: [{
                test: /\.css$/i,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // 使用modules时，每一个css文件是一个对象，在js中引用赋值样式时，class名为此对象的属性值
                            modules: {
                                //  使用`local`值与使用`modules：true`具有相同的效果
                                mode: 'local',
                                localIdentName: '[local]', // 导出的类名不被另外转换
                            },
                        }
                    },
                    { // npm i -D postcss-loader cssnano autoprefixer
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                // 使用postcss-import插件，遵循@import规则，
                                // 你可以将reset.css样式合并到你的主样式表中，减少http请求。
                                require('postcss-import')(),
                                // css浏览器兼容，postcss-cssnext已经内置了autoprefixer。
                                require('postcss-cssnext')(),
                            ],
                        }
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|sass)$/i,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // 使用modules时，每一个css文件是一个对象，在js中引用赋值样式时，class名为此对象的属性值
                            modules: {
                                //  使用`local`值与使用`modules：true`具有相同的效果
                                mode: 'local',
                                localIdentName: '[local]', // 导出的类名不被另外转换
                            },
                        }
                    },
                    { // npm i -D postcss-loader cssnano autoprefixer
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                // css浏览器兼容，postcss-cssnext已经内置了autoprefixer。
                                require('postcss-cssnext')(),
                                // 使用postcss-import插件，遵循@import规则，
                                // 你可以将reset.css样式合并到你的主样式表中，减少http请求。
                                require('postcss-import')(),
                            ],
                        }
                    },
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },
        ]
    }
}

module.exports = merge(comm, env)