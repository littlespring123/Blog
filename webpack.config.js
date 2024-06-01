// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css', // 输出的 CSS 文件名格式  
            chunkFilename: '[id].css', // 输出的 chunk 的 CSS 文件名格式  
        }),
        new ProgressBarPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: '/node_modules/',
                include: path.resolve(__dirname, "./src"),
            },
            {
                test: /\.scss$/, // 匹配所有的.scss文件 
                include: path.resolve(__dirname, "./src"),
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "./src"),
                use: [
                    MiniCssExtractPlugin.loader, // 提取 CSS 到单独文件  
                    'css-loader', // 将 CSS 转换成 CommonJS 模块  
                ],
            },
            {
                test: /\.md$/,
                use: "raw-loader",
                include: path.resolve(__dirname, "./src/assets"),
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        modules: [path.resolve(__dirname, './node_modules'), 'node_modules']
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false
        })],
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
        config.devServer = {
            hot: true,
            open: true,
            host: 'localhost',
            port: 3000,
            proxy: [
                {
                    context: () => true,
                    target: "http://localhost:3001",
                    changeOrigin: true,
                    secure: false,
                }
            ]
        }
    }
    return config;
};
