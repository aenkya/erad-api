var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
var secret = config.sessionSecret;

module.exports = function (req, res, next){
	//check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	//decode token
	if(token) {
		//verifies secret and checks exp
		jwt.verify(token, secret, function(err, decoded){
			if(err){
				return res.status(403).send({
					message: 'Token Invalid'
				});
			} else {
				//if everything is alright, save to request for use in other routes
				req.decoded = decoded;
				next();
			}

		});
	} else {
		//if there is no token
		//return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided'
		});
	}
}