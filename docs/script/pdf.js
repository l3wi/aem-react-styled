var fs = require('fs');
var path = require('path');
var pdf = require('html-pdf');


var source = process.cwd() + '/dist/index.html';
var dest = process.cwd() + '/dist/content.pdf'
var html = fs.readFileSync(source, 'utf8');
var options = {
    base: 'file://' + path.resolve(source),
    format: 'A3',
    border: "2cm"
};

pdf.create(html, options).toFile(dest, function (err, res) {
    if (err) return console.log(err);
    console.log(res);
});