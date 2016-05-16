//change number of color

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    im = require('imagemagick'),

    pathConfig = require('../path');

module.exports = function getColors(req, res, next) {
    console.log("change color");
    var srcPath = req.imageConvert.srcPath,
        numberOfColor = req.body.numberOfColor;
    console.log(srcPath);
    var args = [
        srcPath,
       '-colorspace',
        'RGB',
        '-colors',
        numberOfColor,
        srcPath
    ];

    var p = new Promise(function (resolve, reject) {
        im.convert(args, function (err, data) {
            if (err) {
                reject(err);
            }
            console.log("Image change color complete");
            resolve();
        });

    })
        .then(next);
//wait when image will be saved and then next
};
