'use strict';

module.exports = function (Auth, Presence) {

  var MAX_USER_DISPLAY = 3;

  return {
    restrict: 'A',
    templateUrl: '/views/application/directives/presence/index.html',
    link: function (scope, elem, attrs) {
      var channelName = attrs.ngPresence;

      scope.maxUserDisplay = MAX_USER_DISPLAY;
      scope.currentUser = Auth.currentUser;
      scope.channel = Presence.subscribe(channelName);      

      scope.$watchCollection(
        function() { return scope.channel; },
        function (newValue, oldValue ) {
          scope.extraUsers = scope.channel.length - MAX_USER_DISPLAY - 1;
        }
      );
    }
  };
};
