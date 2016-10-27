var restful = require('node-restful');
var mongoose = restful.mongoose;

var menuSchema = new mongoose.Schema({
    name: String,
    href: String,
    order: Number,
	content: String
});

module.exports = restful.model('menu', menuSchema);