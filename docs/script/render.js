var marked = require("marked");
var handlebars = require("handlebars");
var hljs = require("highlight.js");
var fs = require("fs");

var imageTemplate = handlebars.compile(fs.readFileSync("script/image.hbs", "UTF-8"));

    var markedRenderer = new marked.Renderer();

    markedRenderer.image = function (href, title, text) {
        return imageTemplate({href: href, title: title, text: text});
    };

    markedRenderer.heading = function (text, level) {
        return "<h" + (level + markedRenderer.baseLevel) + ">" + text + "</h" + (level + markedRenderer.baseLevel) + ">";
    }

    markedRenderer.blockquote = function (text) {
        var result = /.*(\[\[(warning|info|danger)\]\])/.exec(text)
        var level="info";
        var type="callout";
        if (result!=null && result.length) {
            if (result.length>=3 && typeof result[2]!=="undefined") {
                level=result[2];
            }
            text=text.substring(0,result[0].length-result[1].length)+text.substring(result[0].length);
        }
        //return level+"-"+type+"   "+text;
        return "<div class=\"bs-"+type+" bs-"+type+"-"+level+"\">" + text + "</div>";
    }

markedRenderer.table = function (header, body) {
        // TODO this is the bootstrap table
        return '<table class="table table-bordered table-striped">\n'
            + '<thead>\n'
            + header
            + '</thead>\n'
            + '<tbody>\n'
            + body
            + '</tbody>\n'
            + '</table>\n';
    }

    marked.setOptions({
        renderer: markedRenderer,
        gfm: true,
        tables: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });


handlebars.registerHelper('plantuml', function (source,  options) {
    if (!source || source==="") {
        return "";
    }
    return "<img src='"+source+"'></img>";
});


handlebars.registerHelper('markdown', function (md, level) {
    if (md) {
        level = level || 1;
        markedRenderer.baseLevel=level;
        var html = marked(md);
        return html;
    } else {
        return "";
    }
});

handlebars.registerHelper("inc", function (lvalue, options) {
    return lvalue+1;
});

var render=function(template, ctx) {

    var compiledTemplate = handlebars.compile(template);
    return compiledTemplate(ctx);
}

module.exports= render;
