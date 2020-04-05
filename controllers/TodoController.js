
const todoService = require('../services/TodoService');


exports.getTodos = (req,res) => {

  todoService.getTodos({userId:req.userId}).
     then((result) => {
      res.json({status:'success',todos:result.todos})
     })
     .catch(err => 
        {
          res.json({status:'failure',msg:err})
          
        })

}


exports.addTodo = (req,res) => {

  let args = {
    userId:req.userId,
    todo:{
      content:req.body.todo,
      updatedAt:new Date()
    }
  }
  todoService.addTodo(args).
    then((status) => {
      // FIRST CONSOLE.LOG
      console.log(status);
      res.json({status:'success'})
    })
    .catch((err) => {
      res.json({status:'failure'})

    })

}


exports.removeTodo = (req,res) => {


  let args = {
    userId:req.userId,
    todoId:req.body.todoId
  }
  todoService.removeTodo(args).
    then(() => {
        res.json({status:'success'});
    })
    .catch(err => {

      res.json({status:'failed',msg:err})
    })
}

exports.updateTodo = (req,res) => {


  let args = {
    userId:req.userId,
    todoId:req.body.todoId,
     todo:{
      content:req.body.content,
      updatedAt:new Date()
     }
  }
  todoService.updateTodo(args).
    then(() => {
        res.json({status:'success'});
    })
    .catch(err => {

      res.json({status:'failed',msg:err})
    })
}
module.exports = exports;