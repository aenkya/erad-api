var express = require('express');
var app = express();
var apiRoutes = express.Router();
var mongoose = require('mongoose');
var config = require('../../config/config.js');

mongoose.connect(config.dbURL)
	.then(()=>console.log('Connection to ERAD database successfull !'))
	.catch((err)=>console.error(err));

module.exports = apiRoutes;