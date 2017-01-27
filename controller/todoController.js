var Todos = require('../models/todoModel');

module.exports = function(app){

    app.get('/api/setupTodos', function(req, res){
        //seed my database
        var starterTodos = [
            {
                username: 'test1',
                todo: 'suck my toughe',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test2',
                todo: 'suck my dick',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test3',
                todo: 'suck my pussy!',
                isDone: false,
                hasAttachment: false
            }
        ];
        Todos.create(starterTodos, function(err, results){
            res.send(results);
        });
    });

}