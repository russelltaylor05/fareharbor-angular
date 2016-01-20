'use strict';

var angular  = require('angular');

var Auth     = require('./auth');
var Presence = require('./presence');

module.exports = angular.module('myApp.application.services', [])
.factory('Auth', Auth)
.factory('Presence', Presence)
.name;
