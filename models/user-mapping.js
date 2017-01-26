var mongoose = require('mongoose');
var user = require( './user' );

//define the schema we need
var userMappingSchema = mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	senior_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

//create the model for users and expose it to our app
module.exports = mongoose.model('UserMapping', userMappingSchema);