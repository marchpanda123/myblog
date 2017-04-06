var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.js');
var Verify = require('./verify');

//login and register part
router.get('/', function(req,res,next) {
	User.find({}, function (err, user) {
      if(err) {
        err.status = 500;
        next(err);
      }
      res.json(user);
    })
});

router.get('/exp', Verify.verifyOrdinaryUser, function(req,res,next) {
  res.json(req.decoded.exp);
});


router.post('/register', function(req, res) {
	User.register(new User({ username : req.body.username}),
	req.body.password, function(err, user) {
		if (err) {
			return res.status(500).json({err: err});
		}

		passport.authenticate('local')(req, res, function() {
			return res.status(200).json({status: 'Registration Successful!'});
		});
	});
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.status(401).json({err: info}); }
    req.logIn(user, function(err) {
      if (err) { return res.status(500).json({ err: 'Could not log in user'});}
      console.log('User in users: ', user);
      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token,
        id:user._id,
        info:user
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

//user info change
var userCtrl = require('../controllers/user.js');

router.put('/user/:userId', userCtrl.userPutId);
router.delete('/user/:userId', userCtrl.userDeleteId);


module.exports = router;