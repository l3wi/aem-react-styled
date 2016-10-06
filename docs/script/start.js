var fs = require("fs");
console.log("start "+process.cwd());
var config = JSON.parse(fs.readFileSync(process.cwd() + "/config.json", "UTF-8"));

var generate = require("./generate");

generate( config.title || "title missing");
console.log("done");
