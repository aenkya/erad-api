var mongoose = require('mongoose');

//define the schema we need
var DepartmentSchema = mongoose.Schema({
    department_name: String,
    department_description: String
})

//create the model for roles and expose it to our app
module.exports = mongoose.model('Department', DepartmentSchema);