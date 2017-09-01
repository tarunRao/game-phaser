const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

function getPlugin() {
    var plugin = [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
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
            }
        ]
    },
    plugins: getPlugin()
};

module.exports = config;