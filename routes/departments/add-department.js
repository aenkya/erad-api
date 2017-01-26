var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Department = require('../../models/department.js');

//Structure
router.post('/departments/create', function(req, res, next){
	var missing = 'missing';
	var check= '';

	//verify singularity
	Department.findOne({
		'department_name': req.body.department_name
	}, function (err, department){
		if(!department){

			var newDepartment = new Department();

			req.body.department_name?newDepartment.department_name=req.body.department_name:check=missing;
			newDepartment.department_description		=	req.body.description;

			if(check==='missing'){
				res.status(403).send({success: false, message:'Department information missing'});
				return;
			}

			newDepartment.save(function(err, post){
				if(err){
					return next(err);
				}
				res.json('Save successfull ! <br>' + post);
			});
		} else {
			res.status(403).send({success: false, message:'Registration Failed. Department already exists!'});
		}
	});
	
});

module.exports = router;
