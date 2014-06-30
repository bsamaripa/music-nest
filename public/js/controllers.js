var musicnest = angular.module('musicnest', []);

musicnest.controller('artistInput', function($scope) {
  $scope.master = {};

  $scope.submit = function(user) {
    $scope.master = angular.copy(user);
  };
});
