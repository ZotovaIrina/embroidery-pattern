//get all color in the image

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    im = require('imagemagick'),

    pathConfig = require('../path');

module.exports = function getColors(req, res, next) {
    console.log("get color");
    var srcPath = req.imageConvert.srcPath;

    var args = [
        srcPath,
        '-unique-colors',
        'txt:-'
    ];

    var p = new Promise(function (resolve, reject) {
        im.convert(args, function (err, data) {
            if (err) {
                reject(err);
            }
            console.log("Get color is complete");
            req.imageConvert.colorMap = data;
            resolve();
        });
    })
        .then(next);
//wait when image will be saved and then next
};