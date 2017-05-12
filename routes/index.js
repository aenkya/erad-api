var express = require('express');

var router = express.Router();
var app = express();
var multer = require('multer');
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

//static file management
var uploadFile = require('./files/fileUpload');

//Structure Files
var newDepartment = require('./departments/add-department');
var newDivision = require('./departments/add-division');
var newUnit = require('./departments/add-unit');
var newRole = require('./roles/add-role');

//Task Route files
var viewTasks = require('./tasks/viewTasks');
var viewTasksById = require('./tasks/viewTasksById');
var createTask = require('./tasks/createTask');
var updateTask = require('./tasks/updateTask');
var forwardTask = require('./tasks/forwardTask');
var deleteTask = require('./tasks/deleteTask');
var searchTask = require('./tasks/searchTask');
var viewTasksByAssignedTo = require('./tasks/viewTasksByAssignedTo');
var viewTasksByCreatedBy = require('./tasks/viewTasksByCreatedBy');
var viewTasksHistory = require('./tasks/viewTasksHistory');



router.get('/', function(req, res, next) {
	res.json('Welcome to the UCC web api');
});

/*************
	Structural Operations
*****/
//Create department
router.post('/departments/create', newDepartment);
app.use( '/departments/create', newDepartment);
//Create division
router.post('/departments/divisions/create', newDivision);
app.use( '/departments/divisions/create', newDivision);
//Create Unit
router.post('/departments/units/create', newUnit);
app.use( '/departments/units/create', newUnit);

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


/**
 * Static File Related Operations
 */
router.post('/uploadFile', uploadFile);
app.use( '/uploadFile', uploadFile);

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

//viewing tasks history for specific user
router.get('/viewTasks/history/:id', viewTasksHistory);
app.use( '/viewTasks/history/:id',  viewTasksHistory );

//Search for Task
router.get('/searchTask',  searchTask);
app.use( '/searchTask',  searchTask );

//create a task
router.post('/createTask', createTask);
app.use( '/createTask', createTask );


//update the contents of a specific task
router.put('/tasks/updateTask', updateTask);
app.use( '/tasks/updateTask', updateTask );

//Forward a task
router.put('/tasks/forwardTask', forwardTask);
app.use( '/tasks/forwardTask', forwardTask );

//Delete Task
router.delete('/tasks/deleteTask', deleteTask);
app.use( '/tasks/deleteTask', deleteTask );

module.exports = connect;
module.exports = router;
