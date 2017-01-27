//Connecting Mongo DB
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

var todoSchema = new Schema({
    username: String,
    todo: String,
    isDone: Boolean,
    hasAttachment: Boolean
});

var Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos; 