module.exports = function(app, passport) {
	/**
	 * Home page with login links
	 */
	app.get('/', function(req, res){
		res.render('index.ejs'); //load the index.ejs file
	})

	/**
	 * LOGIN
	 */
	//show the login form
	
	app.get('/login', function(req, res){
		//render the page and pass in any flash data if it exists
		res.render('login.ejs', {message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: 'login',
		failureFlash: true
	}));

	/**
	 * SIGNUP
	 */
	app.get('/signup', function(req, res){
		//render the page and pass in any flash data if it exists
		res.render('signup.ejs', {message: req.flash('signupMessage') });
	});

	/**
	 * PROFILE SECTION
	 */
	//protected
	//so requires login to visit
	//using route middleware to verify this
	app.get('/profile', isLoggedIn, function(req, res){
		user: req.user //get the user out of the session and pass to template
	});

	/**
	 * LOGOUT
	 */
	app.get('/logout', function(req, res){
		//render the page and pass in any flash data if it exists
		req.logout();
	});

};

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){
	//check if request is authenticated
	if(req.isAuthenticated())
		return next();
	//if not authenticated, redirect home
	res.redirect('/');
}