'use strict';


var config = require('./environment');
var monq = require('monq');
var client = monq(config.mongo.uri);

module.exports = client;
