
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    im = require('imagemagick'),

    pathConfig = require('../path');

module.exports = function resizeImage(req, res, next) {
    console.log("resize image");
    //srcPath - path to temp folder to get original image
    //extention - get extantion original file. We should convert image in gif format. It takes opportunity to limit number of color.
    //distPath - end path of file
    var file = req.files.file,
        width = req.body.widthImage,
        srcPath = path.join(file.path),
        extension = path.extname(file.originalFilename),
        name = path.basename(file.path, extension),
        distName = name + '.gif',
        distPath = path.join(pathConfig.publicDir, '/images/temp_convert/', distName);


    var args = [
        srcPath,
        "-resize",
        width,
        distPath
    ];


    var p = new Promise(function (resolve, reject) {
        im.convert(args, function (err) {
            if (err) {
                reject(err);
            }

            req.imageConvert = {
                srcPath: srcPath
            };

            req.imageConvert = {
                srcPath: distPath
            };
            console.log("Image resize complete");
            resolve();
        });
    })
        .then(next);
//wait when image will be saved and then next
};