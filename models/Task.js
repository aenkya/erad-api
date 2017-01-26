var mongoose = require('mongoose');
var user = require( './user' );

var TaskSchema = new mongoose.Schema({
	
	//task identity
	taskName: String,
	parent_id: { type: mongoose.Schema.Types.ObjectId, ref: this },

	//task details
	category: String,
	description: String,
	status: String,
	priority: String,

	//task users
	created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, //creator
	finished_by: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, //finisher
	assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, //current user


	//task timing
	created_at: {type: Date, Default: Date.now},
	start_date: {type: Date, Default: Date.now},
	updated_at: {type: Date, Default: Date.now},
	completed_at: {type: Date}
});

module.exports = mongoose.model('Task', TaskSchema);