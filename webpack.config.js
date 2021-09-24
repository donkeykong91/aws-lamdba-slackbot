const p = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    name: 'AWS Lambda Slackbot',
    mode: 'development',
    target: 'node10.13',
    context: p.resolve(__dirname),
    entry: 'server.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'slackbot-bundle.js',
        path: p.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: { transpileOnly: true }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|test)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/present-env']
                    }
                }
            },
            {
                test: /\.yaml$/,
                use: [
                    {loader: 'json-loader'},
                    {loader: 'yaml-loader'},
                ]
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    externals: [nodeExternals()],
    externalPresets: {node: true}
}