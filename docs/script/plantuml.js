// this code was copied from https://github.com/markushedvall/node-plantuml because that module does not allow updating plantuml.

var childProcess = require('child_process')
var fs = require('fs');


var DECODE = '-decodeurl'
var PIPE = '-pipe'
var UNICODE = '-tutxt'  
var ASCII = '-ttxt'
var SVG = '-tsvg'
var EPS = '-eps'
var CONFIG = '-config'
var TESTDOT = '-testdot'
var DOT = '-graphvizdot'
var CHARSET = '-charset'
var PLANTUML_JAR = 'vendor/plantuml.jar'



module.exports.generate = function (input, options, callback) {
    var args = arrangeArguments(input, options, callback)
    input = args.input
    options = args.options
    callback = args.callback

    var o = joinOptions([PIPE], options)
    var child = exec(o, options.include, callback)

    if (!input) {
        return generateFromStdin(child)
    } else {
        if (isPath(input, callback)) {
            return generateFromFile(input, child)
        } else {
            return generateFromText(input, child)
        }
    }
}


function isPath (input) {
    try {
        fs.lstatSync(input)
        return true
    } catch (e) {
        return false
    }
}

function joinOptions (argv, options) {
    options.format = options.format || 'png'
    switch (options.format) {
        case 'ascii':
            argv.push(ASCII)
            break
        case 'unicode':
            argv.push(UNICODE)
            break
        case 'svg':
            argv.push(SVG)
            break
        case 'eps':
            argv.push(EPS)
            break
        case 'png':
        default:
            break
    }

    if (options.config) {
        var template = CONFIGS[options.config]
        var file = template || options.config
        argv.push(CONFIG)
        argv.push(file)
    }

    if (options.dot) {
        argv.push(DOT)
        argv.push(options.dot)
    }

    if (options.charset) {
        argv.push(CHARSET)
        argv.push(options.charset)
    }

    return argv
}

function arrangeArguments (input, options, callback) {
    if (typeof input === 'function') {
        callback = input
        input = undefined
    } else {
        if (typeof options === 'function') {
            callback = options
            options = undefined
        }
        if (typeof input !== 'string' && !(input instanceof String)) {
            options = input
            input = undefined
        }
    }

    return {
        input: input,
        options: options,
        callback: callback
    }
}


function generateFromFile (path, child) {
    var rs = fs.createReadStream(path)
    rs.pipe(child.stdin)

    return {
        out: child.stdout
    }
}

function generateFromText (text, child) {
    child.stdin.write(text)
    child.stdin.end()

    return {
        out: child.stdout
    }
}
function exec(argv, cwd, callback) {
    if (typeof argv === 'function') {
        callback = argv
        argv = undefined
        cwd = undefined
    } else if (typeof cwd === 'function') {
        callback = cwd
        cwd = undefined
    }

    var task = execWithSpawn(argv, cwd, callback)

    if (typeof callback === 'function') {
        var chunks = []
        task.stdout.on('data', function (chunk) { chunks.push(chunk) })
        task.stdout.on('end', function () {
            var data = Buffer.concat(chunks)
            callback(null, data)
        })
        task.stdout.on('error', function () {
            callback(new Error('error while reading plantuml output'), null)
        })
    }

    return task
}

function execWithSpawn (argv, cwd, cb) {
    cwd = cwd || process.cwd()
    var opts = [
        '-Dplantuml.include.path=' + cwd,
        '-Djava.awt.headless=true',
        '-jar', PLANTUML_JAR
    ].concat(argv)
    return childProcess.spawn('java', opts)
}
