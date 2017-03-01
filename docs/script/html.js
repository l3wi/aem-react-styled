var config = require("./config");

config.pdfDownload = true;

var generate = require("count-docu").generate;

generate(config);
console.log("done");
