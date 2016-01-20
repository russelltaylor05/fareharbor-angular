'use strict';

module.exports = function ($stateProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/views/schedule/index.html',
    controller: 'MyAppCtrl',
  });
};
