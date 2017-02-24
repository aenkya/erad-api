var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');

var User = require('../../models/user.js');
var UserMapping = require('../../models/user-mapping.js');
var user = new User();
var userMapping = new UserMapping();
var config = require('../../config/config.js');

//Get User Details
router.post('/user', function(req, res, next){
	var subjects = user.subjects;
	var query={};
	if(req.body.id){
		query.user_id = req.body.id;

		User.aggregate([
	        { $lookup: {
	        	from: "roles",
	        	localField: "role",
	        	foreignField: "_id",
	        	as: "role"
	        }},
            { $match: {_id: mongoose.Types.ObjectId(query.user_id)}},
            { $unwind: {path: '$role', preserveNullAndEmptyArrays: true}}
            ,
            { $lookup: {
            	from: "users",
            	localField: "_id",
            	foreignField: "senior",
            	as: "subjects"
            }},
            { $unwind: {path: '$subjects', preserveNullAndEmptyArrays: true}},
            { $project: { "is_active": 1, "gender": 1, "profile_pic_url": 1, "first_name": 1, "last_name": 1, "local": 1,"role": { "department_id": 1}, "subjects": {"_id": 1, "role": 1, "is_active": 1, "profile_pic_url":1, "first_name":1, "last_name":1, "local":1} } }

		], function (err, result) {
	        if (err) {
	            throw err;
	            return;
	        }
			if(!user){
				res.status(404).send({message:'User not found'});
			} else if (user) {

				res.status(201).send(result)
			}
	    });
	}
});


module.exports = router;