const assert = require('chai').assert;
const expect = require("chai").expect;
const request = require("supertest");

const app = require("../app");
const userModel = require('../models/UserModel');
 

var token ,todos;

describe("user register", () => {

    before(async () => {
        await userModel.findOneAndRemove({username:"testUser"});
      });

    it('should register new user', async () => {


        const res = await request(app)
            .post("/user/register")
            .send({username:"testUser",
               password:"Ykteja@222",
               firstName:"krishna",
               lastName:"teja"});
               
               expect(res.status).to.equal(200);
               expect(res.body).to.have.property("status","success");
    });
  
    it('should login the registered user', async () => {

        const res = await request(app)
            .post("/user/login")
            .send({username:"testUser",
               password:"Ykteja@222"});
               
               expect(res.status).to.equal(200);
               expect(res.body).to.have.property("status","success");
               expect(res.body).to.have.property("token");

               token = res.body.token;
    });

})


    describe("api/todo", () => {

        

        describe("addTodo", () => {

            it('should add the todo', async () => {
        
                const res = await request(app)
                    .post("/api/todo/addTodo")
                    .send({"todo":"something12345"})
                    .set('Authorization',`JWT ${token}`);
                       
                       expect(res.status).to.equal(200);
                       expect(res.body).to.have.property("status","success");
            });
    
           });


       describe("getTodos", () => {

        it('should get all the todos of the user', async () => {
    
            const res = await request(app)
                .get("/api/todo/getTodos")
                .set('Authorization',`JWT ${token}`);
                   
                   expect(res.status).to.equal(200);
                    expect(res.body).to.have.property("status","success");
                   expect(res.body).to.have.property("todos");
                   todos = res.body.todos;
        });

       });

       describe("updateTodo", () => {

        it('should add the todo', async () => {
    
            const res = await request(app)
                .post("/api/todo/updateTodo")
                .send({"todoId":todos[0]._id,
                     "content": "update test content"})
                     .set('Authorization',`JWT ${token}`);
                   
                   expect(res.status).to.equal(200);
                   expect(res.body).to.have.property("status","success");
                    //expect(res.body).to.have.property("todos");
        });

       });

       describe("removeTodo", () => {

        it('should add the todo', async () => {
    
            const res = await request(app)
                .post("/api/todo/removeTodo")
                .send({"todoId":todos[0]._id,})
                .set('Authorization',`JWT ${token}`);
                   
                   expect(res.status).to.equal(200);
                   expect(res.body).to.have.property("status","success");
                    //expect(res.body).to.have.property("todos");
        });

       });


    });
