var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Images = require('../models/image');
var Verify = require('./verify.js');

var router = express.Router();

router.use(bodyParser.json());

router.route('/')
    .all(Verify.verifyOrdinaryUser)

    .get(function (req, res, next) {
        var postedBy = req.decoded._doc._id;
        console.log("Get images for user id: ", postedBy);
        Images.find({"postedBy": postedBy})
            .populate('postedBy')
            .exec(function (err, images) {
                if (err) throw err;
                res.json(images);
            });
    })

    .post(function (req, res, next) {
        //_id - file name
        Images.find({"postedBy": req.decoded._doc._id}, function (err, images) {
            console.log("Find images: ", images);
            if (err) throw err;
            if (images.length === 0) {
                console.log("Empty array. User not found");
                var newImages = new Images({"postedBy": req.decoded._doc._id, "images": [req.body._id]});

                newImages.save(function (err, image) {
                    console.log('image created!');
                    if (err) throw err;

                    res.json(image);

                });
            } else {
                for (var i = (images[0].images.length - 1); i >= 0; i--) {
                    if (images[0].images[i] == req.body._id) {
                        var err = new Error('This Dishes already favorite!');
                        err.status = 401;
                        return next(err);
                    }
                }
                images[0].images.push(req.body._id);
                images[0].save(function (err, images) {
                    if (err) throw err;
                    console.log('Updated images!');
                    res.json(images);
                });

            }
        })

    });


router.route('/:imageId')
    .all(Verify.verifyOrdinaryUser)

    .get(function (req, res, next) {
        Images.find({"postedBy": req.decoded._doc._id}, function (err, images) {
            for (var i = (images[0].images.length - 1); i >= 0; i--) {
                if (images[0].images[i] == req.params.imageId) {
                    res.status(200).json({
                        success: true,
                        message: "get image",
                        imageURL: req.params.imageId
                    })
                } else {
                    res.status(200).json({
                        success: false,
                        message: "you have not access to this image",
                        imageURL: req.params.imageId
                    })
                }
            }
        })
    })

    .delete(function (req, res, next) {
        Images.find({"postedBy": req.decoded._doc._id}, function (err, images) {
            for (var i = (images[0].images.length - 1); i >= 0; i--) {
                if (images[0].images[i] == req.params.imageId) {

                    images[0].images.splice(i, 1);
                    images[0].save(function (err, images) {
                        if (err) throw err;
                        console.log('Dish delete from images!');
                        res.json(images);
                    });
                }
            }
        })
    });

module.exports = router;