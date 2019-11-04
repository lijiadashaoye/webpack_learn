const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');

console.log(path.resolve(__dirname))
console.log(path.join(__dirname))

module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: './index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        open: true,
        port: 6541,
        hot: true,
        noInfo: true,
        // hotOnly:true,
        inline: true // “inline”选项会为入口页面添加“热加载”功能
    },
    devtool: 'source-map', // 生产环境最好不用
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Learn',
        }),
        new CleanWebpackPlugin(),
        // 如果通过启用了“ 热模块更换 ” HotModuleReplacementPlugin，则其接口将在module.hot属性下公开
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
                test: /\.(png|jpe?g|gif|bmp)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 设置图片打包阀值，如果超过阀值才会单独打包，否则直接以base64形式写到代码里
                        limit: 1024 * 15, // 30kb
                        name() {
                            if (process.env.NODE_ENV === 'production') {
                                return '[name].[ext]';
                            }
                            return '[contenthash].[ext]';
                        },
                        outputPath: 'images',
                    },
                }, ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                loader: 'file-loader',
                options: {
                    name() {
                        if (process.env.NODE_ENV === 'development') {
                            return '[path][name].[ext]';
                        }
                        return '[contenthash].[ext]';
                    },
                    outputPath: 'fonts',
                }
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
                                localIdentName: '[hash:base64]', // 为了生成类名不是纯随机
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
                                require('cssnano')() // 压缩css
                            ],
                        }
                    },
                    'sass-loader',
                ],
                exclude: [path.resolve(__dirname, 'node_modules')]
            },
            {
                // npm install -D babel-loader @babel/core @babel/preset-env
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }
            }
        ]
    }
}