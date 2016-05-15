
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    im = require('imagemagick'),

    pathConfig = require('../path');

module.exports = function resizeImage(req, res, next) {
    var file = req.files.file,
        srcPath = path.join(file.path),
        width = req.body.widthImage,
        extension = path.extname(file.originalFilename),
        name = path.basename(file.originalFilename, extension),
        distName = name + '.gif',
        distPath = path.join(pathConfig.publicDir, '/images/resize/', distName);

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
            console.log("Image resize complete");
            resolve();
        });
    })
        .then(next);
//wait when image will be saved and then next
};