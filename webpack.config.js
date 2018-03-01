module.exports = {
    entry: {
        userPage: './public/js/userPageEntry.js',
        formSearch: './public/js/formSearchEntry.js',
        purchaseForm: './public/js/purchaseFormEntry.js'
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
            },
            {
                test: /\.css?$/,
                loader: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
}