var express = require('express'),
    router = express.Router(),
    path = require('path'),
    multiparty = require('connect-multiparty'),
    fs = require('fs'),

    pathConfig = require('../path'),
    resizeImage = require('../middleware/resizeImage.js');


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
    resizeImage,
    function (req, res) {
        console.log("router");
        var file = req.files.file;
        res.json({
            success: true,
            textMessage: 'Новое фото успешно сохранено',
            file: file
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