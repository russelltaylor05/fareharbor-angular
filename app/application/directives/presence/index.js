'use strict';

var angular = require('angular');

var directive = require('./directive');

module.exports = angular.module('lob.application.directives.ng-presence', [])
.directive('ngPresence', directive)
.name;
