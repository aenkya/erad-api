var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	
	//task identity
	task_name: String,
	//task details
	category: String,
	note: String,
	status: String,

	//task users
	created_by: String, //creator

	//creation of task, completion of task, update of task
	created_at: {type: Date, Default: Date.now},
	updated_at: {type: Date, Default: Date.now},
	completed_at: {type: Date, Default: Date.now}
});

module.exports = mongoose.model('Task', TaskSchema);