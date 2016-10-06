var file = require("file");
var fs = require("fs");
var render = require("./render");
var pathTool = require('path')
var plantuml = require('./plantuml')

var outputDir = "/dist";
var workingDir = process.cwd();

var removePrefixAndSuffixFromName = function (name) {
    var parts = name.match(/(\d+_)?([^\.]*)(\.md)?/);
    if (parts && parts.length > 0) {
        return parts[2];
    } else {
        return name;
    }
}

var readChapter = function (dirName, level) {

    var targetPath = workingDir + outputDir;
    var dir = pathTool.parse(dirName);
    var chapter = {title: removePrefixAndSuffixFromName(dir.name), sections: [], chapters: []};
    var ls = fs.readdirSync(dirName);
    ls.forEach(function (fileName) {
        var path = dirName + "/" + fileName;
        if (fs.lstatSync(path).isFile()) {
            var ext = pathTool.extname(path).substring(1);
            if (ext == "md") {
                var content = fs.readFileSync(path, "UTF-8");
                var title = removePrefixAndSuffixFromName(fileName);
                if (title === "") {
                    chapter.sections.push(content);
                } else {
                    chapter.chapters.push({level: level, title: title, content: content});
                }
            } else if ("puml" === ext) {
                var content = fs.readFileSync(path, "UTF-8");
                plantuml.generate(path, {format: 'png'}, function (e, buffer) {
                    console.log("generated uml image " + fileName);
                    fs.writeFileSync(targetPath + "/" + fileName, buffer);
                })
            }
        } else {
            var newChapter = readChapter(path, level + 1)
            chapter.chapters.push(newChapter);
        }
    })
    return chapter;
}

function generate(title) {

    console.log(" workingDir "+workingDir);
    var doc = readChapter(workingDir + "/src", 1);
    doc.title = title;
    doc.date = new Date();
    var ls = fs.readdirSync(workingDir + "/src");

    var template = fs.readFileSync(workingDir + "/script/doc.hbs", "UTF-8");
    var html = render(template, doc);
    fs.writeFileSync(workingDir + outputDir + "/index.html", html)
}

module.exports = generate;
