'use strict';

var angular     = require('angular');
var router      = require('angular-ui-router');
var bootstrap   = require('angular-ui-bootstrap');
var config      = require('config');

var appConfig   = require('./config');
var appRun      = require('./run');

var application = require('./application');
var schedule    = require('./schedule');

module.exports = angular.module('myApp', [
  config,
  bootstrap,
  router,
  application,
  schedule
])
.config(appConfig)
.run(appRun)
.name;
