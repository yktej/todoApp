
const userModel = require('../models/UserModel');


/**
 * add a todo 
 * @param  {Object(userId)) userId 
    * @return {Promise}    result of the find operation
    */
exports.addTodo = async (args) => {

   let user = await userModel.findOne({username:args.userId});

   if(user){
    user.todos.push(args.todo);
   }else{
    return new Promise.reject('failed');
   }

   let status = await user.save();

   console.log(user);

   return status;

}

/**
 * remove a todo of the user
 * @param  {Object(userId)) userId 
    * @return {Promise}    result of the find operation
    */
exports.removeTodo = async (args) => {

   let user = await userModel.findOne({username:args.userId});

   user.todos.id(args.todoId).remove();

   return await user.save();

    

}

/**
 * update a todo of the user
 * @param  {Object(userId)) userId 
    * @return {Promise}    result of the find operation
    */
exports.updateTodo = async (args) => {

   let user = await userModel.findOne({username:args.userId});

   let todo = user.todos.id(args.todoId);

   todo.content = args.todo.content;
   todo.updatedAt = args.todo.updatedAt;
   return await user.save();

    

}


/**
 * Get all the todos of the user
 * @param  {Object(userId)) userId 
 * @return {Promise}    result of the find operation
 */
exports.getTodos  = async ({userId}) => {

    return await userModel.findOne({username:userId});


}

module.exports = exports;