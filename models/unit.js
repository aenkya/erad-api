var mongoose = require('mongoose');

//define the schema we need
var UnitSchema = mongoose.Schema({
    unit_name: String,
    unit_description: String
})

//create the model for roles and expose it to our app
module.exports = mongoose.model('Unit', UnitSchema);