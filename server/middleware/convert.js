var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    im = require('imagemagick'),

    pathConfig = require('../path');

module.exports = function getColors(req, res, next) {
    console.log("convert color");
    var file = req.files.file,
        extension = path.extname(file.originalFilename),
        name = path.basename(file.originalFilename, extension),
        srcName = name + '.gif',
        srcPath = path.join(pathConfig.publicDir, '/images/changeColor/', srcName),
        distPath = path.join(pathConfig.publicDir, '/images/convert/', srcName);

    var colorString = req.body.color,
        expr = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/g;

    var colorArray = [];

    function getMatches(string, regex) {
        var match;
        while (match = regex.exec(string)) {
            var color = {};
            color.red = match[1];
            color.green = match[2];
            color.blue = match[3];
            colorArray.push(color);
        }
        return matches;
    }

    var matches = getMatches(colorString, expr);

    //console.log("colorArray", colorArray);
    var dmcColor = path.join(pathConfig.serverDir, '/parsing/DMCcolor.json');
    var paletteOfColor = [];
    jsonfile.readFile(dmcColor, function (err, data) {
        if (err) throw err;
        paletteOfColor = data;

        colorArray.forEach(function (item, index) {
            //for each color on original photo get red, green, blue
            var deltaColor,
                minDelta = 9999,
                minIndex = -1,
                colorRed = item.red,
                colorGreen = item.green,
                colorBlue = item.blue;

            for (var i = 0; i < paletteOfColor.length; i++) {
                var paletteRed = paletteOfColor[i].red,
                    paletteGreen = paletteOfColor[i].green,
                    paletteBlue = paletteOfColor[i].blue;
                //different betveen 2 color: ((r2 - r1)2 + (g2 - g1)2 + (b2 - b1)2)1/2
                deltaColor = Math.pow(Math.pow((paletteRed - colorRed), 2) + Math.pow((paletteGreen - colorGreen), 2) + Math.pow((paletteBlue - colorBlue), 2), 0.5);
                if (deltaColor < minDelta) {
                    minDelta = deltaColor;
                    minIndex = i;
                }
            }

            item.closest = paletteOfColor[minIndex];
        });
        var imPointsArray = [];
        colorArray.forEach((item, index)=> {
            imPointsArray.push('-fill', item.closest.color, '-opaque', 'rgb(' + item.red + ',' + item.green + ',' + item.blue + ')');
        });

        var args = [
            srcPath,
            '-channel',
            'RGB',
            ...imPointsArray,
            distPath
        ];
        console.log("args", args);
        var p = new Promise(function (resolve, reject) {
            im.convert(args, function (err, data) {
                if (err) {
                    reject(err);
                }
                console.log("Image change color complete", data);
                resolve();
            });

        })
            .then(next);






    });


};