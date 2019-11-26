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
                    }
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
                                localIdentName: '[hash:base64:5]', // 为了生成类名不是纯随机，类名字符长度为5
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
            }),
            new OptimizeCSSAssetsPlugin() // 用于css最小化
        ],
        splitChunks: { // 代码分割
            // 规定可以匹配的引入（import）文件的方式（同步initial、异步async）
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: '[name]',
                }
            }
        },
        runtimeChunk: { // 兼容老版本webpack，使打包时contenthash起作用
            name: 'runtime'
        }
    },
}
module.exports = merge(comm, prod)