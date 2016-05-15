var im = require('imagemagick');
var fs = require('fs');

var colorArray = JSON.parse(fs.readFileSync('./DMCcolor.json', 'utf8'));
var imPointsArray = [];

//ECMAScript 6 create array: ['-fill', "#cfa296", '-draw', `point 5x0`, .....] which include all color in json file
colorArray.forEach((item, index)=> {
    imPointsArray.push('-fill', item.color, '-draw', `point ${index}x0`);
});

//ECMAScript 6 ...imPointsArray push array in particular space in other array
var args = [
    '-size',
    `${colorArray.length}x1`,
    'xc:white',
    ...imPointsArray,
    './DMCcolormap.gif'
];

var p = new Promise(function (resolve, reject) {
    im.convert(args, function (err) {
        if (err) {
            reject(err);
        }
        console.log('Image resize complete');
        resolve();
    });
});