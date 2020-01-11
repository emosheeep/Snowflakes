const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        main: './src/js/main.js'
    },
    output: {
        filename: '[name].js',
        path: resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: resolve('./src/js')
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
