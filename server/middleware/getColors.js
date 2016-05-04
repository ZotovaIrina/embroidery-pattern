var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    im = require('imagemagick'),

    pathConfig = require('../path');

module.exports = function getColors(req, res, next) {
    console.log("get color");
    var file = req.files.file,
        extension = path.extname(file.originalFilename),
        name = path.basename(file.originalFilename, extension),
        srcName = name + '.gif',
        srcPath = path.join(pathConfig.publicDir, '/images/resize/', srcName);
    distPath = path.join(pathConfig.publicDir, '/images/color/', srcName);
    console.log("srcPath ", srcPath, "distPath ", distPath);


    var args = [
        srcPath,
        '-unique-colors',
        '-scale',
        ' 1000%',
        distPath
    ];

    var p = new Promise(function (resolve, reject) {
        im.convert(args, function (err) {
            if (err) {
                throw err;
            }
            console.log("Image color complete");
            resolve();
        });
    })
        .then(next);
//wait when image will be saved and then next
};