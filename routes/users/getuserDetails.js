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
		//query.role_id = '_id';
		//query.role_final = mongoose.Types.ObjectId(query.role_id);
		//console.log(query.user_id);

		User.aggregate([
	        { $lookup: {
	        	from: "roles",
	        	localField: "role",
	        	foreignField: "_id", //howw did it work?? You cannot pass an object into query. I mustve got confused along the way. let me try with another role. Seems alright now. The model changes were crucial. So any more changes. What I am doing here in case youre wondering is picking user data. So the id gets passed in and it fetches the user and then fetches the rest of the info about the user based on the IDs; like the role. The subjects is the next part.
	        	//each user could have people below them or have a superior. So the subjects were stored in the user data initially but im thinking of just using a mapping. which is where you see themapping model. So are you going to aggregate again to get the suborniates. Yess. Which creates some depth I guess
	        	as: "role"
	        }},
            {$match: {_id: mongoose.Types.ObjectId(query.user_id)}},
            { $unwind: {path: '$role', preserveNullAndEmptyArrays: true}},// also, is there any need to unwind the role, there's only one per person. Yes, if you don't when you try to access the data later then you will. let me try not unwinding and see the result. though its safer to unwind. it works fine. but ill leave it in. No what I mean is htat when you try to access the data after, the one's in an array will not be accessed. Yeah I get, but the role is not in array storage anywhere. thats for the subjects. thats why I was unwinding them. When you use look up then the results are returned in an array. ok ok I see. So anyways, this subjects thing. each user has an id. So when someone has subordinates, their subordinates id should either be in the subjects array, or the master-subordinate mapping should be stored and then all the data that matches the filter fetched
            { $lookup: {
            	from: "users",
            	localField: "_id",
            	foreignField: "senior",
            	as: "subjects"
            }},
            { $unwind: {path: '$subjects', preserveNullAndEmptyArrays: true}},
            { $unwind: {path: '$senior', preserveNullAndEmptyArrays: true}}
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
	    });  //the problem is with the foreignField of $lookup. It shouldn't. It worked in the console. well the argument passed in for id is longer than 12 bytes. let me try with the name that worked but use a long string. Actually I cant now, since its an object not a string. Can you debug. I actually know nothing about debugging JS. Let me check online

		/*User.aggregate([
			//find the user whose id matches the supplied id with $match
			{ $match : { _id : mongoose.Types.ObjectId(query.user_id) } },

			//separate the entries for each object in the subject array
			{ $unwind: {path: '$subjects', preserveNullAndEmptyArrays: true}},

			//join the role information based on the role got from the matched user
	        { $lookup: {
	        	from: "roles",
	        	localField: "role",
	        	foreignField: "_id", //ok so what do I pass in here. because '_id' may not work
	        	as: "role"
	        }}
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
	    });*/
	}
});


module.exports = router;