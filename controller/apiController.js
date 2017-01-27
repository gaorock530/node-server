var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //search and find all the data
    app.get('/api/todo', function(req, res){

        Todos.find({}, function(err, todo){
            if (err) throw err;
            res.send(todo);
        });
    });
    //search by username
    app.get('/api/todos/:uname', function(req, res){

        Todos.find({ username: req.params.uname }, function(err, todo){
            if (err) throw err;
            res.send(todo);
        });

    });
    //search by id
    app.get('/api/todo/:id', function(req, res){

        Todos.findById({ _id: req.params.id }, function(err, todo){
            if (err) throw err;
            res.send(todo)
        });

    });

    //create or update user
    app.post('/api/todo', function(req, res){

        if (req.body.id) {
            //update
            Todos.findByIdAndUpdate(req.body.id, {
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function(err, todo){
                if (err) throw err;
                res.send('Updated Success!');
            });
        }else{
            //create
            var newTodo = Todos({
                username: req.body.username,
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save(function(err){
                if (err) throw err;
                res.send("Created Successfully!");
            })

        }

    });
    //delete user
    app.delete('/api/todo',function(req, res){

        Todos.findByIdAndRemove(req.body.id, function(err){
            if (err) throw err;
            res.send('USER Deleted!');
        });

    });

}