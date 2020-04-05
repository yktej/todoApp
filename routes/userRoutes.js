var express = require('express');
var router = express.Router();

let loginController = require('../controllers/LoginController');


/* api for user registration */
router.post('/register', loginController.registerUser);
/* api for user authentication */
router.post('/login', loginController.authenticateUser);


module.exports = router;
