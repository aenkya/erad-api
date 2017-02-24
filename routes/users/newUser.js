var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../../models/user.js');

//Create user
router.post('/setup', function(req, res, next){

	//verify singularity
	User.findOne({
		'local.email': req.body.email
	}, function (err, user){
		if(!user){

			var newUser = new User();

			newUser.local.email	=	req.body.email;
			newUser.password =	req.body.password;
			newUser.first_name		=	req.body.first_name;
			newUser.last_name		=	req.body.last_name;
			newUser.profile_pic_url		=	req.body.profile_pic_url;
			newUser.gender		=	req.body.gender;
			newUser.is_active		=	req.body.is_active;
			newUser.role		=	req.body.role;
			newUser.senior		=	req.body.senior;

			newUser.save(function(err, post){
				if(err){
					return next(err);
				}
				res.json('Save successfull ! <br>' + post);
			});
		} else {
			res.status(403).send({success: false, message:'Registration Failed. User already exists!'});
		}
	});
	
});

module.exports = router;

		