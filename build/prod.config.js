const path = require('path');
const merge = require('webpack-merge');
const comm = require('./comm.config');

// 生产环境打包
const prod = {
    mode: 'production',
    output: {
        filename: '[contenthash].js',
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
                use: ['style-loader',
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

                ],
                exclude: [path.resolve(__dirname, './../node_modules')]
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
    },
}

module.exports = merge(comm, prod)