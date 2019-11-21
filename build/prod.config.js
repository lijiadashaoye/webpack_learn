const path = require('path');
const merge = require('webpack-merge');
const comm = require('./comm.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


// 生产环境打包
const prod = {
    mode: 'production',
    output: {
        filename: '[contenthash].js', // 定义从entry中使用的入口文件的名字
        chunkFilename: '[contenthash].js', // 定义动态引入的文件的名字
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
                test: /\.(png|jpe?g|gif|bmp)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 设置图片打包阀值，如果超过阀值才会单独打包，否则直接以base64形式写到代码里
                        limit: 1024 * 20, // 30kb
                        name: '[contenthash].[ext]',
                        outputPath: 'images',
                    },
                }, ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[contenthash].[ext]',
                    outputPath: 'fonts',
                }
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, // 将css提取出来
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // 使用modules时，每一个css文件是一个对象，在js中引用赋值样式时，class名为此对象的属性值
                            modules: {
                                //  使用`local`值与使用`modules：true`具有相同的效果
                                mode: 'local',
                                localIdentName: '[hash:base64]', // 为了生成类名不是纯随机
                            },
                        }
                    },
                    { // npm i -D postcss-loader autoprefixer
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                // css浏览器兼容，postcss-cssnext已经内置了autoprefixer。
                                require('postcss-cssnext')(),

                                // 配制了 optimize-css-assets-webpack-plugin 后这俩可以不写

                                // require('cssnano')() // 压缩css
                                // 使用postcss-import插件，遵循@import规则，
                                // 你可以将reset.css样式合并到你的主样式表中，减少http请求。
                                // require('postcss-import')(),
                            ],
                        }
                    },

                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|sass)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // 使用modules时，每一个css文件是一个对象，在js中引用赋值样式时，class名为此对象的属性值
                            modules: {
                                //  使用`local`值与使用`modules：true`具有相同的效果
                                mode: 'local',
                                localIdentName: '[hash:base64]', // 为了生成类名不是纯随机
                            },
                        }
                    },
                    { // npm i -D postcss-loader
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                // 使用postcss-import插件，遵循@import规则，
                                // 你可以将reset.css样式合并到你的主样式表中，减少http请求。
                                // require('postcss-import')(),
                                // css浏览器兼容，postcss-cssnext已经内置了autoprefixer。
                                require('postcss-cssnext')(),
                            ],
                        }
                    },
                    'sass-loader',
                ],
                exclude: /node_modules/,
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
                    },
                ]

            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ // 将css提取出来
            filename: '[contenthash].css',
            chunkFilename: '[contenthash].css',
        }),

    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ // 最小化js代码插件
                exclude: /\/excludes/,
                terserOptions: {
                    output: {
                        comments: false, // 执行删除代码里的所有注释
                    },
                },
                extractComments: false, // 是否将注释提取到单独的文件中，为ture会单独生成注释文件
            }),
            new OptimizeCSSAssetsPlugin({ // 最小化输出 MiniCssExtractPlugin 提取出的css文件插件， 内置 cssnano
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true
                        }
                    }],
                },
            })
        ],
    },
}

module.exports = merge(comm, prod)