'use strict';

var angular     = require('angular');

var presence  = require('./presence');

module.exports = angular.module('lob.application.directives', [
  presence
])
.name;
