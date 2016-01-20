'use strict';

module.exports = function ($httpProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);

};
