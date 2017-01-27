//first Application
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controller/todoController');
var apiController = require('./controller/apiController');

var port = process.env.PORT || 3000;
//define a DIR '/assets' refs to '/public' folder
app.use('/assets', express.static(__dirname + '/public'));
//choose a View Engine using 'ejs'
app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());

setupController(app);
apiController(app);

app.get('/',function(req, res){
    res.render('index');
})

app.listen(port);