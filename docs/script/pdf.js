var config = require("./config");

config.pdfDownload = false;
config.pdf = true;

var generate = require("count-docu").generate;

generate(config);
console.log("done");