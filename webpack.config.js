const path = require('path');

module.exports = {
    // Cấu hình đường dẫn và điểm khởi đầu của ứng dụng
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // Thêm phần dự phòng vào resolve của webpack
    resolve: {
        fallback: {
            "zlib": require.resolve("browserify-zlib"),
            "querystring": require.resolve("querystring-es3"),
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "http": require.resolve("stream-http"),
            "url": require.resolve("url"),
            "buffer": require.resolve("buffer"),
            "util": require.resolve("util"),
            "stream": require.resolve("stream-browserify"),
            "fs": false,
            "net": false
        }
    },
    // Các cài đặt khác của webpack
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            // Các rules khác...
        ],
    },
    // Các cài đặt bổ sung khác của webpack
};
