//replace image's colors by most similar in palette
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    im = require('imagemagick'),

    pathConfig = require('../path');

module.exports = function getColors(req, res, next) {
    console.log("convert color");
    var srcPath = req.imageConvert.srcPath;

    var colorString = req.imageConvert.colorMap,
        expr = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/g;

    //find rgb for all color in string which give imagemagick in getColor middleware in write in colorArray
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
    }

    getMatches(colorString, expr);

    //get list of string's color and then find the most similar
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
                //different between 2 color: ((r2 - r1)2 + (g2 - g1)2 + (b2 - b1)2)1/2
                deltaColor = Math.pow(Math.pow((paletteRed - colorRed), 2) + Math.pow((paletteGreen - colorGreen), 2) + Math.pow((paletteBlue - colorBlue), 2), 0.5);
                if (deltaColor < minDelta) {
                    minDelta = deltaColor;
                    minIndex = i;
                }
            }

            item.closest = paletteOfColor[minIndex];
        });

        //create array for imagemagick and list of string
        var imPointsArray = [],
            closestColor = [];
        colorArray.forEach((item)=> {
            imPointsArray.push('-fill', item.closest.color, '-opaque', 'rgb(' + item.red + ',' + item.green + ',' + item.blue + ')');
            closestColor.push(item.closest);
        });
        req.imageConvert.listOfColor = closestColor;
        var args = [
            srcPath,
            ...imPointsArray,
            srcPath
        ];
        var p = new Promise(function (resolve, reject) {
            im.convert(args, function (err, data) {
                if (err) {
                    reject(err);
                }
                console.log("Image replace color complete");
                resolve();
            });

        })
            .then(next);


    });


};