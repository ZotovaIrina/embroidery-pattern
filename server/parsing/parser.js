var fs = require('fs'),
    cheerio = require('cheerio');

function parser() {
    console.log("parser!!!!!!!!");
    var string = "hello world";
    var n = string.indexOf("e");
    console.log("n", n);
    var file = fs.readFileSync('./18-1-0-170.html', "utf8");
    var name = "",
    color = "",
        red = "",
        green,
        blue,
        collection = [];

    $ = cheerio.load(file);
    $("#my-table").find('tr').each(function () {
        var element = {};
        element.color = $(this).find('td').eq(0).attr('bgcolor');
        element.dmccode = $(this).find('td').eq(1).text();
        name = $(this).find('td').eq(2).text();
        element.name = name.replace(/\s\s+/g, ' ');
        red = color.substring(1, 3);
        collection.push(element);
        console.log(red);
    });


    fs.writeFileSync('./DMCcolor.json', JSON.stringify(collection));
    //console.log(collection);
}

parser();