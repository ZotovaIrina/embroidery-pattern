var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    im = require('imagemagick'),

    pathConfig = require('../path');

module.exports = function resizeImage(req, res, next) {
    var file = req.files.file,
        page = req.params.page,
        srcPath = path.join(file.path),
        width = req.body.widthImage,
        dstPath = path.join(pathConfig.publicDir, '/images/resize/', file.originalFilename);
    console.log("dstPath ", dstPath, "width ", width);

    console.log('resize image ', file.originalFilename);

    var args = [
        srcPath,
        "-resize",
        width,
        dstPath
    ];


    var p = new Promise(function (resolve, reject) {
        im.convert(args, function (err) {
            if (err) {
                throw err;
            }
            console.log("Image resize complete");
            resolve();
        });
    })
        .then(next);
//wait when image will be saved and then next
};