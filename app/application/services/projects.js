'use strict';

module.exports = function ($http, API_URL) {

  var Projects = {};

  Projects.findAll = function (params) {
    return $http.get(API_URL + '/projects', { params: params })
    .then(function (data) {
      return data;
    })
    .catch(console.log);
  };

  return Projects;

};