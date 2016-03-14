'use strict';

var config = require('./configuration');

console.log(config.get('NODE_ENV'));
console.log(config.get('database'));
console.log(config.get('server'));