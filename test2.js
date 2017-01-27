
//APP testing

var express = require('express');
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/database');

var Schema = mongoose.Schema;

var personSchema = new Schema({
    firstname: String,
    lastname: String,
    address: String
});

var Person = mongoose.model('Person', personSchema);



var port = process.env.PORT || 3000;

app.use('/assets',express.static(__dirname + '/public'));

app.set('view engine','ejs');

app.get('/',function(req, res, next){
    console.log('request URL: ' + req.url);
    //get all the users
    // Person.find({}, function(e, users){
    //     if (e) throw e;
    //     //object of all users
    //     console.log(users);
        
    // })
    next();
})
var people = [
    {name: 'Magic'},
    {name: 'Chenie'},
    {name: 'CHEN BO'}
];
app.get('/',function(req, res){
    res.render('index',{ serverPeople: people });
})
app.get('/person/:id',function(req, res){
    res.render('person', { url: req.params.id});
})

app.listen(port);