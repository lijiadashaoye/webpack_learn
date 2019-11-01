const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        open: true,
        port: 6541
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'learn',
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [{
                test: /\.(png|jpe?g|gif|bmp)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {

                        // 设置图片打包阀值，如果超过阀值才会单独打包，否则直接以base64形式写到代码里
                        limit: 1024 * 500, // 500 kb
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
                test: /\.scss$/i,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // 使用modules时，每一个css文件是一个对象，在赋值样式时，class名为此对象的属性值
                            modules: true,
                            importLoaders: 2,
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
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        },
                    },
                ]
            },
            {
                test: /\.m?js$/i,
                exclude: /(node_modules|bower_components)/,
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