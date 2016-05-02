var express = require('express');
var router = express.Router(),
    path = require('path'),
    pathConfig = require('../path'),
    multiparty = require('connect-multiparty'),
    fs = require('fs');




router.route('/')

    .get(function (req, res, next) {
        console.log('upload get');
        res.json({
            success: true
        });
    })

    .post(
    multiparty({
        uploadDir: path.join(pathConfig.publicDir, '/images/temp/')
    }),

    function (req, res, next) {
        console.log('upload post');
        var folder = pathConfig.publicDir + '/images/temp/';
        console.log(folder);
        res.json({
            success: true
        });
    })

    .put(function (req, res, next) {
        console.log('upload put');
        res.json({
            success: true
        });
    })

    .delete(function (req, res, next) {
        console.log('upload delete');
        res.json({
            success: true
        });
    });

module.exports = router;