var musicnest = angular.module('musicnest', []);

musicnest.controller('userInput', function($scope) {
  $scope.master = {};
  var artistInput;

  $scope.submit = function(user) {
    $scope.artistInput = user;
  };

});
