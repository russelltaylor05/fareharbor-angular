'use strict';

var _ = require('lodash');

module.exports = function ($http, $filter, Auth) {
  
  var capitalize = $filter('uppercase');
  var channels = {};
  
  return {    
    // Subscribe to the channel.
    subscribe: function(channelName){
      var channel = channels[channelName];
      if(!channel){
        channel = channels[channelName] = [];
      }
      channel.push(Auth.currentUser);
      return channel;
    },
    
    // Unsubscribe from the channel.
    unsubscribe: function(channelName){
      delete channels[channelName];
    },
    
    // Adds or removes a random user to all current channels, for testing.
    update: function(){
      $http({
        method: 'GET',
        url: 'https://randomuser.me/api'
      }).then(function(response){
        var randomUser = response.data.results[0].user;
        console.log(randomUser);
        var user = {
          name: capitalize(randomUser.name.first) + ' ' + capitalize(randomUser.name.last),
          username: randomUser.username,
          imageUrl: randomUser.picture.medium
        };
        
        _.forEach(channels, function(channel, channelName){
          if(Math.random() < 0.75){
            channel.push(user);
          }
          else if(channel.length > 1){
            channel.pop();
          }
        });
      });
    }
  };
};