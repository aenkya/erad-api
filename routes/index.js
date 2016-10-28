var express = require('express');
var router = express.Router();
var app = express();
var viewTasks = require('./tasks/viewTasks');
var viewTasksById = require('./tasks/viewTasksById');
var createTask = require('./tasks/createTask');
var updateTask = require('./tasks/updateTask');

/**
 * Routes
 *
 * @route_name       location
 */

router.get('/', function(req, res, next) {
	res.json('Welcome to the UCC web api');
});

/**
 * Viewing tasks
 */
//viewing tasks as a whole
router.get('/viewTasks', viewTasks);
app.use( '/viewTasks', viewTasks );

//viewing specific tasks
router.get('/viewTasks/:id', viewTasksById);
app.use( '/viewTasks/:id', viewTasksById );


//create a task
router.post('/createTask', createTask);
app.use( '/createTask', createTask );


//update the contents of a specific task
router.put('/updateTask/:id', updateTask);
app.use( '/updateTask/:id', updateTask );

var users = require('./users/users');
var admin = require('./users/admin');

module.exports = users;
module.exports = router;
