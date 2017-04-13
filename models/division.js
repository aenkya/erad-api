var mongoose = require('mongoose');

//define the schema we need
var DivisionSchema = mongoose.Schema({
    division_name: String,
    division_description: String
})

//create the model for roles and expose it to our app
module.exports = mongoose.model('Division', DivisionSchema);