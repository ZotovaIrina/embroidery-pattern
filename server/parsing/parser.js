var fs = require('fs'),
    cheerio = require('cheerio');

function parser() {
    console.log("parser!!!!!!!!");
    var file = fs.readFileSync('./18-1-0-170.html', "utf8");
    var name = "",
        collection = [];
    $ = cheerio.load(file);
    $("#my-table").find('tr').each(function () {
        var element = {};
        element.color = $(this).find('td').eq(0).attr('bgcolor');
        element.dmccode = $(this).find('td').eq(1).text();
        name = $(this).find('td').eq(2).text();

        element.name = name.replace(/\s\s+/g, ' ');
        collection.push(element);

    });

    fs.writeFileSync('./DMCcolor.json', JSON.stringify(collection));
    //console.log(collection);
}

parser();