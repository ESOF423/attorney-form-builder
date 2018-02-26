module.exports = {
    entry: {
        userPage: './public/js/userPageEntry.js',
        formSearch: './public/js/formSearchEntry.js'
    },

    output: {
        filename: '[name].js',
        path: __dirname + '/public/build',
        publicPath: './'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['react'],
                    plugins: ['transform-class-properties']
                }
            }
        ]
    }
}