var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');  //add this to your dependencies. checking
var role = require( './role' );
SALT_WORK_FACTOR = 10; //is that it??Yes. Impressive. Ok now to lookup in aggregation

//define the schema we need
var userSchema = mongoose.Schema({
	local: {
		email: String,
	},
	password: String,
	twitter: {
		id: String,
		token: String,
		displayName: String,
		username: String
	},

	senior: { type: mongoose.Schema.Types.ObjectId, ref: this },//I think it will work. testing it now
	subjects: Array,
	first_name: String,
	last_name: String,//while youre in here, my hash and salt dont help the passwords. they are still stored in plain form. Any help? Let me get on that
	profile_pic_url: String,
	gender: String,
	is_active: Boolean,
	role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' } //this might most likely be the problem. 
})

//***
//methods


//generating a hash
/*userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password)
};*/


userSchema.pre( 'save', function ( next )
{
    var user = this;

    // only hash the password if it has been modified (or is new)
    if ( !user.isModified( 'password' ) ) return next();

    // generate a salt
    bcrypt.genSalt( SALT_WORK_FACTOR, function ( err, salt )
    {
        if ( err ) return next( err );

        // hash the password using our new salt
        bcrypt.hash( user.password, salt, function ( err, hash ) //not sure about that part since youd nexted the password field. Itll work
        {
            if ( err ) return next( err );

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function ( candidatePassword, cb ) //This method should be referenced when trying to login 
{
    bcrypt.compare( candidatePassword, this.password, function ( err, isMatch )
    {
        if ( err ) return cb( err );
        cb( null, isMatch );
    });
};


//Try running the application and register a new user
//ive changed all local.password to password,





//create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);