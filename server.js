const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {  
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (e) => {
        if (e) console.log('Unable to append to server.log');
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('update');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getFullYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('scream', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home Page',
        welcome: 'Welcome to Home Page.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'Home Page',
        welcome: 'Welcome to About Page.'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad Request!'
    });
});

app.listen(port, () => {
    console.log(`Server is up running on Port:${port}`);
});