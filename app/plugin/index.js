'use strict';

var angular       = require('angular');

var controller    = require('./controller');
var state         = require('./state');

module.exports = angular.module('myApp.plugins', [])
.controller('MyAppCtrl', controller)
.config(state)
.name;
