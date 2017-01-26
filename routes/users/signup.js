var express = require('express');
var app = express();
var router = express.Router();
var config = require('../../config/config.js');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
//required for passport
app.use(session({secret: config.sessionSecret})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in the session

router.post('/signup', 
	passport.authenticate(
		'local-signup', 
		{
			successRedirect: '/profile',
			failureRedirect: '/signup',
			failureFlash: true
		}
	){
		console.log('success')
	}
);