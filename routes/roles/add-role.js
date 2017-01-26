var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Role = require('../../models/role.js');

//Structure
router.post('/roles/create', function(req, res, next){
	var missing = 'missing';
	var check= '';

	//verify singularity
	Role.findOne({
		'role_name': req.body.role_name
	}, function (err, role){
		if(!role){

			var newRole = new Role();

			req.body.role_name?newRole.role_name=req.body.role_name:check=missing;
			req.body.department_id?newRole.department_id=req.body.department_id:check=missing;
			req.body.permission?newRole.permission=req.body.permission:check=missing;
			newRole.role_description		=	req.body.description;

			if(check==='missing'){
				res.status(403).send({success: false, message:'Role information missing'});
				return;
			}
			newRole.save(function(err, post){
				if(err){
					return next(err);
				}
				res.json('Save successfull ! <br>' + post);
			});
		} else {
			res.status(403).send({success: false, message:'Registration Failed. Role already exists!'});
		}
	});
	
});

module.exports = router;
