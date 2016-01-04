/*eslint no-console: 0*/

var path = require('path');
var webpack = require('webpack');

var jcrPath = path.join(__dirname, '..', 'content', 'jcr_root', 'etc', 'designs', 'react-demo', 'js', 'react-demo');

var serverJs = false;
for (var idx in process.argv) {
    var arg = process.argv[idx];
    if (arg === '--env=production') {
        process.env.NODE_ENV = 'production';
    } else if (arg === '--env=development') {
        process.env.NODE_ENV = 'development';
    }
    if (arg === '--server') {
        serverJs = true;
    }
}

var targetFileName = serverJs ? "server.js" : "app.js";

console.log("Webpack build for '" + process.env.NODE_ENV + "' -> " + targetFileName);

var entries = [];
if (!serverJs) {
    entries.push('./website.tsx');
} else {
    entries.push('./server.tsx');
}


var config = {
    entry: entries,
    debug:true,
    output: {
        path: jcrPath,
        filename: targetFileName
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.tsx', '.webpack.js', '.web.js', '.js'],
        modulesDirectories: [path.join(__dirname, 'node_modules')]
    },
    module: {
        loaders: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"' + process.env.NODE_ENV + '"'
            }
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
    config.devtool = 'inline-source-map';
}

module.exports = config;
