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

    var args = [
        srcPath,
        '-unique-colors',
        '-depth',
        ' 16',
        'txt:-'
    ];

    var p = new Promise(function (resolve, reject) {
        var color = im.convert(args, function (err, data) {
            if (err) {
                throw err;
            }
            console.log("Image color complete", data);
            resolve();
        });

    })
        .then(next);
//wait when image will be saved and then next
};