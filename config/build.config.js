const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: './src/js/snow.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, './src/js')
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    mode: 'production',
    devtool: 'cheap-source-map'
}
