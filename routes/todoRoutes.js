var express = require('express');
var router = express.Router();

let todoController = require('../controllers/TodoController');

/* GET all the todos. */
router.get('/getTodos', todoController.getTodos);
/* add a  todo. */
router.post('/addTodo', todoController.addTodo);
/* remove a todo. */
router.post('/removeTodo', todoController.removeTodo);
/* update a todo. */
router.post('/updateTodo', todoController.updateTodo);

module.exports = router;
