var express = require('express');

var router = express.Router();
var app = express();

//connect file
var connect = require('./users/connect');

/**
	initialization of the route values exported from their respective files
**/

//User User Files
var newUser = require('./users/newUser');
var authenticateUser = require('./users/authenticateUser');
var tokenAuthenticate = require('../middleware/tokenAuthenticate');
var auth0 = require('../middleware/auth0');
var getUserDetails = require('./users/getUserDetails');

//Structure Files
var newDepartment = require('./departments/add-department');
var newRole = require('./roles/add-role');

//Task Route files
var viewTasks = require('./tasks/viewTasks');
var viewTasksById = require('./tasks/viewTasksById');
var createTask = require('./tasks/createTask');
var updateTask = require('./tasks/updateTask');
var searchTask = require('./tasks/searchTask');



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
router.post('/user', getUserDetails);
app.use( '/user', getUserDetails);


/**
 * Task related Operations
 */

//viewing tasks as a whole
router.get('/viewTasks',  viewTasks);
app.use( '/viewTasks',  viewTasks );

//viewing specific tasks
router.get('/viewTasks/:id', viewTasksById);
app.use( '/viewTasks/:id',  viewTasksById );

//Search for Task
router.get('/searchTask',  searchTask);
app.use( '/searchTask',  searchTask );

//create a task
router.post('/createTask', createTask);
app.use( '/createTask', createTask );


//update the contents of a specific task
router.put('/updateTask/:id', updateTask);
app.use( '/updateTask/:id', updateTask );

module.exports = connect;
module.exports = router;
