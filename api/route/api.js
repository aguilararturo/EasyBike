var express = require('express');
var router = express.Router();

var user = require('../models/userSchema');
user.methods(['get', 'post', 'put', 'delete']);
user.register(router, '/user');

var menu = require('../models/menuSchema');
menu.methods(['get', 'post', 'put', 'delete']);
menu.register(router, '/menu');

var bike = require('../models/bikeSchema');
bike.methods(['get', 'post', 'put', 'delete']);
bike.register(router, '/bike');

module.exports = router;