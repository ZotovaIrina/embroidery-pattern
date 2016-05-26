var express = require('express'),
    router = express.Router(),
    path = require('path'),
    multiparty = require('connect-multiparty'),

    pathConfig = require('../path'),
    resizeImage = require('../middleware/resizeImage.js'),
    getColors = require('../middleware/getColors.js'),
    changeColor = require('../middleware/changeColor.js');
    convert = require('../middleware/convert.js');

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
    changeColor,
    getColors,
    convert,
    function (req, res) {
        console.log("router POST image");
        //console.log("color", req.body.color);
        var file = req.imageConvert;
        res.json({
            success: true,
            textMessage: 'File upload successfully',
            fileName: file.fileName,
            color: file.listOfColor
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