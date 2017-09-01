const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

function getPlugin() {
    var plugin = [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([{
            from: 'src/images'
        }]),
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            watch: true
        }),
    ];
    
    if(process.env.NODE_ENV === 'production') {
       plugin.push = new webpack.optimize.UglifyJsPlugin();
    }

    return plugin;
}

config = {
    entry: {
        main: ['./src/main.ts']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/')
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions:['.ts', '.tsx', '.js'],
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2,
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { 
                            minimize: true
                        }
                    },
                    'sass-loader?sourceMap'
                ]
            },
            {   
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
            test: /pixi\.js/,
                use: [{
                    loader: 'expose-loader',
                    options: 'PIXI',
                }],
            },
            {
            test: /phaser-split\.js$/,
                use: [{
                    loader: 'expose-loader',
                    options: 'Phaser',
                }],
            },
            {
            test: /p2\.js/,
                use: [{
                    loader: 'expose-loader',
                    options: 'p2',
                }],
            },
        ],
    },
    plugins: getPlugin()
};

module.exports = config;