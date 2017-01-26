var mongoose = require('mongoose');
var department = require( './department' );

//define the schema we need
var RoleSchema = mongoose.Schema({
    role_name: String,
    department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'department' },  //Change that to an object id

    permission: Number,
    role_description: String
})

//create the model for roles and expose it to our app
module.exports = mongoose.model('Role', RoleSchema);