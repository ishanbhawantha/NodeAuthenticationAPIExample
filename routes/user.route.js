const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../config/envvariable');
const User = require('../models/user.model');
const checkAuth = require('../middlewares/check-auth');

router.post('/test', checkAuth, (req, res) => {
    res.json({
        message: 'your courage is awsome!'
    });
});

//login route 
router.post('/login', function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            console.log('error')
        }
        if (!user) {
            res.json({
                success: false,
                message: 'User is not found. Please signUp again..!'
            });
        }
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) throw err;
                if (result) {
                    console.log(result);
                    const JWTToken = jwt.sign({
                        email: user.email
                    }, key.key, {
                        expiresIn: '24h'
                    });
                    res.json({
                        success: true,
                        message: 'This is token',
                        token: JWTToken
                    });

                } else {
                    res.json({
                        success: false,
                        message: 'Please login agein...!'
                    });
                }
            });
        }

    });
});



//sign up route 
router.post('/signup', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (user) {
            res.json({
                message: 'The user is already exist. Please Login!'
            });
        }
        if (!user) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    res.json({
                        message: ' Error while sign up please signin again'
                    });
                } else {
                    req.body.password = hash;
                    console.log(req.body.password);
                    console.log(req.body);

                    User.create(req.body).then(function (user) {
                        res.json({
                            message: `The acount is successfully created for ${req.body.email}`,
                            message2: req.body
                        });

                    });
                }
            });
        }

    });
});
module.exports = router;