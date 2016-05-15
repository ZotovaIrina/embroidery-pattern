//change color using color map


var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    im = require('imagemagick'),

    pathConfig = require('../path');

module.exports = function getColors(req, res, next) {
    console.log("change color");
    var file = req.files.file,
        numberOfColor = req.body.numberOfColor,
        extension = path.extname(file.originalFilename),
        name = path.basename(file.originalFilename, extension),
        srcName = name + '.gif',
        srcPath = path.join(pathConfig.publicDir, '/images/resize/', srcName),
        distPath = path.join(pathConfig.publicDir, '/images/changeColor/', srcName),
        colormap = path.join(pathConfig.serverDir, '/parsing/DMCcolormap.gif');

    var args = [
        srcPath,
        '-colorspace',
        'RGB',
        //'-dither',
        //'none',
        //'-remap',
        //colormap,
        '-colors',
        numberOfColor,
        distPath
    ];

    var p = new Promise(function (resolve, reject) {
        var color = im.convert(args, function (err, data) {
            if (err) {
                reject(err);
            }
            console.log("Image change color complete", data);
            resolve();
        });

    })
        .then(next);
//wait when image will be saved and then next
};
