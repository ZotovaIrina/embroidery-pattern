var fs = require('fs');

var collection = JSON.parse(fs.readFileSync('./DMCcolor.json', 'utf8'));
var color = [];
collection.forEach(function(item) {
     color.push(item.color);
});
color.forEach(function(item, i) {
    var red = parseInt(item.substring(1, 3), 16);
    var green = parseInt(item.substring(3,5), 16);
    var blue = parseInt(item.substring(5,7), 16);
    var string = red.toString(16);
    //red = parseInt(string, 16);
    collection[i].red = red;
    collection[i].green = green;
    collection[i].blue = blue;


});
console.log(collection);
fs.writeFileSync('./DMCcolor.json', JSON.stringify(collection));
