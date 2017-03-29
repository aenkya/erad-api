var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');

var User = require('../../models/user.js');
var Role = require('../../models/role.js');
var UserMapping = require('../../models/user-mapping.js');
var user = new User();
var role = new Role();
var userMapping = new UserMapping();
var config = require('../../config/config.js');

//Get User Details
router.post('/user', function(req, res, next){
	var subjects = user.subjects;
	var query={};
  var role_data;
  var user_permission = 6;
  var user_department = "588759d382beab2ec054cf04";
	if(req.body.id){
		query.user_id = req.body.id;
    query.role_id = "5887585dae324214a4a6e51f";

		User.aggregate(
      [
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
        { $project: { "is_active": 1, "gender": 1, "profile_pic_url": 1, "first_name": 1, "last_name": 1, "local": 1,"role": 1, "subjects": {"_id": 1, "role": 1, "is_active": 1, "profile_pic_url":1, "first_name":1, "last_name":1, "local":1} } }
  		], 
      function (err, result) {
        if (err) {
          throw err;
          return;
        }
  			if(!user){
  				res.status(404).send({message:'User not found'});
  			} else if (user) {

          Role.aggregate([
            { $match: {department_id: user_department, permission: {$lt: user_permission}}},
            {$project: {"_id": 1, "permission": 1, "role_name": 1}}
            ], function(err, role_result) {
              if (err)
                throw err;
              role_data = result;
              res.status(201).send(role_data)
          });
  			}
      }
    );

	}
});


module.exports = router;