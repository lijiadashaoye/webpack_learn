const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: { //入口
        main: path.resolve(__dirname, "./index.js")
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './../dist')
    },
    resolve: {
        alias: { // 定义文件读取路径快捷名称，两种写法都可以
            assets: path.resolve(process.cwd(), 'assets'),
            src: './../src',
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, './../dist'),
        publicPath: "/",
        open: true,
        port: 6541,
        hot: true,
        inline: true // “inline”选项会为入口页面添加“热加载”功能
    },
    devtool: 'source-map', // 生产环境最好不用
    optimization: {
        usedExports: true, // 摇树化，生产环境自动使用，开发环境加了也不会删除代码，只是标记一下引入并未使用
        splitChunks: { // 代码分割
            chunks: 'all', // 规定可以匹配的引入（import）文件的方式（同步initial、异步async）
            minSize: 30000, // 30kb,设置文件大小阀值，超过这个阀值才会对其进行拆分
            maxSize: 0, // 定义二次拆分的阀值，超过阀值，会进行二次拆分
            minChunks: 1, // 拆分前被共享模块的最低引用次数。
            maxAsyncRequests: 5, // 按需加载时最大并行请求数。
            maxInitialRequests: 3, // 入口点（首页）的最大并行请求数。
            automaticNameDelimiter: '~', // 指定用于生成名称的定界符
            automaticNameMaxLength: 30, // 设置由生成的块的名称最大字符数
            name: true, // 将基于块和缓存组密钥自动生成一个名称
            cacheGroups: {
                vendors: { // 定义符合规则的引入怎么拆分
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10 // 打包优先级
                },
                default: { // 其他情况的拆分
                    minChunks: 1, // 拆分前被共享模块的最低引用次数。
                    priority: -20,
                    reuseExistingChunk: true // 对已拆分的模块不再拆分
                }
            }

        }
    },
    // "sideEffects": [  // 在package.json 添加，以表示不要被摇树化的文件类型
    //   "*.css",
    //   "*.scss"
    // ],
    plugins: [
        new HtmlWebpackPlugin({ // 自动生成html文件
            title: 'Webpack Learn',
        }),
        new CleanWebpackPlugin(), // 清理dist文件夹
        // 如果通过启用了“ 热模块更换 ” HotModuleReplacementPlugin，则其接口将在module.hot属性下公开
        // 不能在使用HotModuleReplacementPlugin插件的同时开启hotOnly；
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
                        outputPath: 'assets/images',
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
                    outputPath: 'assets/fonts',
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
                exclude: [path.resolve(__dirname, './../node_modules')]
            },
            {
                // npm install -D babel-loader @babel/core @babel/preset-env
                // babel/plugin-transform-runtime 和 babel/preset-env 是babel-loader将ES6语法
                // 转译成ES5语法使用的两个插件，两个只需要使用一个就行，
                // 只不过， babel/plugin-transform-runtime 适用于开发组件或者库的时候使用，防止全局污染，
                // babel/preset-env 是我们在开发一般项目时使用的；
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            ['@babel/preset-env']
                        ],
                        plugins: ['@babel/plugin-transform-runtime'], // 使Babel运行时作为单独的模块，以避免重复。
                        cacheDirectory: true // 用于缓存加载程序的结果
                    }
                },
                exclude: [path.resolve(__dirname, './../node_modules')]
            }
        ]
    }
}