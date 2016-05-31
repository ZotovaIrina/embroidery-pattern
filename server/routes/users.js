var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. Verify.verifyAdmin, */
router
    .get('/', function (req, res, next) {
        User.find({}, function (err, user) {
            if (err) throw err;
            res.json(user);
        });
    });


router
    .post('/register', function (req, res) {
        console.log('register', req.body);
        var username = req.body.username,
            password = req.body.password,
            email = req.body.email;
        User.find({username: username}, function (err, docs) {
            if (docs.length) {
                console.log('Name exists already');
                res.status(401).json({
                    success: false,
                    message: 'This login using already'
                });
            }
            else {
                User.find({email: email}, function (err, docs) {
                    if (docs.length) {
                        console.log('Email exists already');
                        res.status(401).json({
                            success: false,
                            message: 'This email using already'
                        });
                    } else {
                        User.register(new User({username: username}),
                            password, function (err, user) {
                                if (err) {
                                    return res.status(500).json({success: false,
                                        err: err});
                                }
                                if (req.body.firstname) {
                                    user.firstname = req.body.firstname;
                                }
                                if (req.body.lastname) {
                                    user.lastname = req.body.lastname;
                                }
                                if (email) {
                                    user.email = email;
                                }
                                user.save(function (err, user) {
                                    passport.authenticate('local')(req, res, function () {
                                        var token = Verify.getToken(user);
                                        return res.status(200).json({
                                            success: true,
                                            message: 'Registration Successful!',
                                            token: token
                                        });
                                    });
                                });
                            });

                    }
                })
            }
        });


    });

router
    .post('/login', function (req, res, next) {
        console.log(req.body);
        var username = req.body.username,
            password = req.body.password;
        User.findOne({username: username}, function (err, user) {
            if (!user) {
                console.log('Name not exist');
                res.status(401).json({
                    success: false,
                    message: 'This login is not exist'
                });
            }
            else {
                console.log("user", user);
                passport.authenticate('local', function (err, user, info) {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return res.status(401).json({
                            success: false,
                            err: info
                        });
                    }
                    req.logIn(user, function (err) {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                err: 'Could not log in user'
                            });
                        }

                        var token = Verify.getToken(user);
                        res.status(200).json({
                            status: 'Login successful!',
                            success: true,
                            token: token
                        });
                    });
                })(req, res, next);

            }
        });
    });

router
    .get('/logout', function (req, res) {
        req.logout();
        res.status(200).json({
            success: true,
            message: 'Bye!'
        });
    });

router.get('/facebook', passport.authenticate('facebook'),
    function (req, res) {
    });

router.get('/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            var token = Verify.getToken(user);
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

module.exports = router;
