var express = require('express');

var router = express.Router();
var app = express();

var jwt = require('jsonwebtoken');
var session = require('express-session');
var mongoose = require('mongoose');

var User = require('../../models/user.js');
var user = new User();
var config = require('../../config/config.js');


var secret = config.sessionSecret;


//Create user
router.post('/authenticate', function(req, res, next){
	user.local.email	=	req.body.email;
	user.password = req.body.password;
	//find the user
	User.findOne({
		'local.email': req.body.email
	}, function (err, user){
		if(err)
			throw err;
		if(!user){
			res.status(404).send({message:'User not found'});
		} else if (user) {
			//check if password matches

			user.comparePassword( req.body.password, function ( err, isMatch ){
				if ( err ) {
					console.err();
					/*throw err;*/
				}
                if ( !isMatch ){
                    res.status(406).send({
						message:"Incorrect password"
					});
                }
                //if the user is found and the password is right 
                //create token
                var token = jwt.sign( user, secret, {
                    expiresIn: '120h' 
                });

                //return the information including token as json
                res.status(201).send({
					id: user._id,
					token: token
				});
            });
		}
	})
	
});

module.exports = router;