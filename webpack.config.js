const path = require('path')

module.exports = {
    entry: {
        userPage: './public/js/userPageEntry.js',
        attorneyPage: './public/js/attorneyPageEntry.js',
        formSearch: './public/js/formSearchEntry.js',
        purchaseForm: './public/js/purchaseFormEntry.js',
        formBuilder: './public/js/formBuilderEntry.js'
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
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },

    resolve: {
        alias: {
            'node_modules': path.resolve(__dirname, 'node_modules'),
            css: path.resolve(__dirname, 'public/css/'),
            js: path.resolve(__dirname, 'public/js')
        }
    }
}