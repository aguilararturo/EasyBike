var restful = require('node-restful');
var mongoose = restful.mongoose;

var bikeSchema = new mongoose.Schema({
    model: String,
    conductor: String,
    state: String,
    pedidos: String
});

module.exports = restful.model('bike', bikeSchema);