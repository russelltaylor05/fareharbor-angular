'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/views/plugin/index.html',
    controller: 'MyAppCtrl',
  });
};
