var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var role = require( './role' );

SALT_WORK_FACTOR = 10;

//define the schema we need
var userSchema = mongoose.Schema({
    //login with the native login implementation
	local: {
		email: String,
	},
	password: String,

    //login with twitter
	twitter: {
		id: String,
		token: String,
		displayName: String,
		username: String
	},

	senior: { type: mongoose.Schema.Types.ObjectId, ref: this }, //the user's immediate superior

	first_name: String,
	last_name: String,
	profile_pic_url: String,
	gender: String,

	is_active: Boolean, //the user's active status

	role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' } //the user's role
})

userSchema.pre( 'save', function ( next ){
    var user = this;

    // only hash the password if it has been modified (or is new)
    if ( !user.isModified( 'password' ) ) 
        return next();

    // generate a salt
    bcrypt.genSalt( SALT_WORK_FACTOR, function ( err, salt ){
        if ( err ) 
            return next( err );

        // hash the password using our new salt
        bcrypt.hash( user.password, salt, function ( err, hash ){
            if ( err ) 
                return next( err );
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

//create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
