const path = require('path');

var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                }
            }),
        ],
    },
    "plugins": [
        new webpack.DefinePlugin({ // <-- key to reducing React's size
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
        //new webpack.optimize.DedupePlugin(), //dedupe similar code 
        //new webpack.optimize.UglifyJsPlugin(), //minify everything
        //new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
        //new webpack.optimization.minimize()
        //
        //new CompressionPlugin({
        //})
    ],
    "mode": "development",
    "entry": "./src/index.js",
    "output": {
        "path": __dirname+'/static',
        //"filename": "[name].[chunkhash:8].js"
        "filename": "bundle.js"
    },
    "target": "web",
    "module": {
        "rules": [
            {
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "env",
                            "react"
                        ]
                    }
                }
            }
        ]
    }
}
