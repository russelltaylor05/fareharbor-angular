'use strict';

var angular    = require('angular');

var services   = require('./services');
var directives = require('./directives');

module.exports = angular.module('myApp.application', [
  services,
  directives  
])
.name;
