/*eslint no-console: 0*/

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var serverJs = false;
var watch = false;
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
    if (arg === '--watch') {
        watch = true;
    }
}

console.log("watch = " + watch);
var jcrPath = path.join(__dirname, '..', '..', '..', 'target', 'classes', 'etc', 'designs', 'react-demo', 'js', 'react-demo');


var targetFileName = serverJs ? "server.js" : "app.js";

console.log("Webpack build for '" + process.env.NODE_ENV + "' -> " + targetFileName);
console.log("jcrpath '" + jcrPath);


var target = "web";
var entries = {};
if (!serverJs) {
    entries.app = './client.tsx';
} else {
    entries.server = './server.tsx';
}

//  env==production : prevents spurious error in nashorn when checking: typeof instance.receiveComponent === 'function'
var env = '"' +process.env.NODE_ENV+'"' ;// '"' + (serverJs ? "production" : process.env.NODE_ENV) + '"';

console.log("env " + env)

var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': env
        }
    })];

var config = {
    entry: entries,
    debug: true,
    target: target,
    output: {
        path: jcrPath,
        filename: "[name].js"
    },
    resolve: {
        extensions: ['', '.tsx', '.webpack.js', '.web.js', '.js']

    },
    module: {
        loaders: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'

            }
        ]
    },
    plugins: plugins

};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
    config.devtool = 'inline-source-map';
}

module.exports = config;
