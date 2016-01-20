'use strict';

module.exports = function ($rootScope, $scope, API_URL, Presence) {
  
  $scope.boats = [
    { 
      name: 'S.S. Slick Willy',
      time: '12:00pm',
      channelName: 'channel-1',
    },
    { 
      name: 'S.S. Salty Sam',
      time: '1:00pm',
      channelName: 'channel-2',
    },
    { 
      name: 'S.S. Freddy Five Fingers',
      time: '2:00pm',
      channelName: 'channel-3',
    }
  ];
  
  $scope.randomize = function(){
    Presence.update();
  }  

};
