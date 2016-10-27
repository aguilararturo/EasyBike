var restful = require('node-restful');
var mongoose = restful.mongoose;

var userSchema = new mongoose.Schema({
    membrecia: String,
    name: String,
    direccion: String,
    pedidos: String
});

module.exports = restful.model('user', userSchema);