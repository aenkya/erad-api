var mongoose = require('mongoose');
var user = require( './user' );

var TaskSchema = new mongoose.Schema({
	
	//task identity
	taskName: String,
	parent_id: { type: mongoose.Schema.Types.ObjectId, ref: this },

	//task details
	category: String,
	description: String,
	active: Boolean,
	priority: Boolean,
	duration: Number,

	//task users
	created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, //creator
	finished_by: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, //finisher
	assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, //current user


	//task timing
	created_at: Number,
	start_date: Number,
	updated_at: Number,
	completed_at: Number,
	finish_date: Number,

	//attachments
	attachments: Array
});

module.exports = mongoose.model('Task', TaskSchema);