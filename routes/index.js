var express = require('express');

var router = express.Router();
var app = express();

//connect file
var connect = require('./users/connect');

/**
	initialization of the route values exported from their respective files
**/

//User Files
var newUser = require('./users/newUser');
var authenticateUser = require('./users/authenticateUser');
var tokenAuthenticate = require('../middleware/tokenAuthenticate');
var auth0 = require('../middleware/auth0');
var getUserDetails = require('./users/getuserDetails');
var getUserSubjects = require('./users/getUserSubjects');

//Structure Files
var newDepartment = require('./departments/add-department');
var newRole = require('./roles/add-role');

//Task Route files
var viewTasks = require('./tasks/viewTasks');
var viewTasksById = require('./tasks/viewTasksById');
var createTask = require('./tasks/createTask');
var updateTask = require('./tasks/updateTask');
var deleteTask = require('./tasks/deleteTask');
var searchTask = require('./tasks/searchTask');
var viewTasksByAssignedTo = require('./tasks/viewTasksByAssignedTo');
var viewTasksByCreatedBy = require('./tasks/viewTasksByCreatedBy');



router.get('/', function(req, res, next) {
	res.json('Welcome to the UCC web api');
});

/*************
	Structural Operations
*****/
//Create department
router.post('/departments/create', newDepartment);
app.use( '/departments/create', newUser);

//Create Role
router.post('/roles/create', newRole);
app.use( '/roles/create', newRole);

/**
 * User related operations
 */
//creating a new user
router.post('/setup', newUser);
app.use( '/setup', newUser);

//signup
/*router.post('/signup', passport);
app.use('/signup', passport);*/

//Authenticating a new user
router.post('/authenticate', authenticateUser);
app.use( '/authenticate', authenticateUser);

router.use(tokenAuthenticate);

/*Getting the users details*/
router.get('/user/:id', getUserDetails);
app.use( '/user/:id', getUserDetails);

/*Getting the users subjects*/
router.post('/user/subjects', getUserSubjects);
app.use( '/user/subjects', getUserSubjects);

/**
 * Task related Operations
 */

//viewing tasks as a whole
router.get('/viewTasks',  viewTasks);
app.use( '/viewTasks',  viewTasks );

//viewing specific tasks
router.get('/viewTask/:id', viewTasksById);
app.use( '/viewTask/:id',  viewTasksById );

//viewing tasks assigned to specific user
router.get('/viewTasks/in/:id', viewTasksByAssignedTo);
app.use( '/viewTasks/in/:id',  viewTasksByAssignedTo );

//viewing tasks created by specific user
router.get('/viewTasks/out/:id', viewTasksByCreatedBy);
app.use( '/viewTasks/out/:id',  viewTasksByCreatedBy );

//Search for Task
router.get('/searchTask',  searchTask);
app.use( '/searchTask',  searchTask );

//create a task
router.post('/createTask', createTask);
app.use( '/createTask', createTask );


//update the contents of a specific task
router.put('/updateTask', updateTask);
app.use( '/updateTask', updateTask );

//Delete Task
router.delete('/deleteTask', deleteTask);
app.use( '/deleteTask', deleteTask );

module.exports = connect;
module.exports = router;
