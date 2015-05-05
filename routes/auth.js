var express = require('express');
var router 	= express.Router();
var User 	= require('../models/User');
var jwt    	= require('jsonwebtoken');
var _		= require('lodash');
var expressJwt = require('express-jwt');

router.post('/login', function(req, res){
	User.findOne({email: req.body.email}, function(err, user){
		if(err){
			res.json({
				type: false,
				data: 'Ocorreu um erro: ' + err
			});
			return err;
		}

		if(user){
			if(!user.validPassword(req.body.password)){
				res.json({
					type: false,
					data: 'Oops! Senha incorreta',
				});
			} else {
				var userObj = user.toObject();
				delete userObj.password;

				res.json({
					type: true,
					data: userObj,
					token: user.generateToken(userObj)
				});
			}
		} else {
			res.json({
				type: false,
				data: 'Usuário não cadastrado!'
			});
		}
	});
});

router.post('/signup', function(req, res){

	if(!req.body.email){
		res.json({
			type: false,
			data: 'Voce precisa nos dizer seu e-mail!'
		});

		return;
	} else if(!req.body.password){
		res.json({
			data: false,
			data: 'Voce deve escolher uma senha'
		});

		return;
	};

	User.findOne({email: req.body.email}, function(err, user){
		if(err){
			res.json({
				type: false,
				data: 'Ocorreu um erro: ' + err
			});
			return err;
		}

		if(user){
			res.json({
                type: false,
                data: "Parece que este e-mail ja está cadastrado em nosso sistema"
            });
		} else {
			var newUser = new User();
			newUser.username = req.body.username,
			newUser.email = req.body.email,
			newUser.password = newUser.generateHash(req.body.password);
			//newUser.token = newUser.generateToken(newUser);

			newUser.save(function(err, user){
				if(err){
					res.json({
						type: false,
						data: 'Ocorreu um erro ao salvar suas informações!'
					});

					return err;
				}

				var userObj = user.toObject();
				delete userObj.password;

				res.json({
					type: true,
					data: userObj,
					token: user.generateToken(userObj)
				});
			});
		}
	});
});

module.exports = router;
