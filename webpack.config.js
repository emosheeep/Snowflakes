/*eslint-disable*/
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        main: './src/ts/main.ts'
    },
    output: {
        filename: '[name].js',
        path: resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                include: resolve('src'),
            },
            {
                test: /\.ts$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: resolve('src'),
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: resolve('img/[name].[hash:7].[ext]'),
                    fallback: 'file-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        })
    ],
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: './img', // 本地静态文件暴露，引入图片时以此作为根目录
        hot: true
    }
}
