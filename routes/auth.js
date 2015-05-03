var express = require('express');
var router 	= express.Router();
var User 	= require('../models/User');
var jwt    	= require('jsonwebtoken');
var expressJwt = require('express-jwt');

router.post('/login', function(req, res){
	User.findOne({email: req.body.email}, function(err, user){
		if(err){
			res.json({
				type: false,
				data: 'Error occured: ' + err
			});
			return err;
		}

		if(!user.validPassword(req.body.password)){
			res.json({
				type: false,
				data: 'Oops! Incorrect password',
			});
		} else {
			res.json({
				type: true,
				data: user,
				token: user.generateToken(user)
			});
		}
	});
});

router.post('/signup', function(req, res){

	if(!req.body.email){
		res.json({
			type: false,
			data: 'You must specify your e-mail'
		});

		return;
	} else if(!req.body.password){
		res.json({
			data: false,
			data: 'You must choose a password'
		});

		return;
	};

	User.findOne({email: req.body.email}, function(err, user){
		if(err){
			res.json({
				type: false,
				data: 'Error occured: ' + err
			});
			return err;
		}

		if(user){
			res.json({
                type: false,
                data: "User already exists!"
            });
		} else {
			var newUser = new User();
			newUser.email = req.body.email,
			newUser.password = newUser.generateHash(req.body.password);
			//newUser.token = newUser.generateToken(newUser);

			newUser.save(function(err, user){
				if(err){
					res.json({
						type: false,
						data: 'Error occured on save data'
					});

					return err;
				}

				res.json({
					type: true,
					data: user,
					token: user.generateToken(user)
				});
			});
		}
	});
});

module.exports = router;
