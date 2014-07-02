angular.module('artistController', [])

// inject the Artist service factory into our controller
.controller('mainController', function($scope, $http, Artists) {
  $scope.formData = {};
  $scope.loading = true;

  // Query ==================================================================
  // when submitting the add form, send the text to the node API
  $scope.searchArtist = function() {
    $scope.loading = true;
    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    if ($scope.formData.text !== undefined) {
      // call the create function from our service (returns a promise object)
      Artists.create($scope.formData)
      // if successful creation, call our get function to get all the new todos
      .success(function(data) {
        console.log(data);
        $scope.loading = false;
        //$scope.formData = {}; // clear search form
        $scope.artist = data; // assign our new list of todos
      });
      $scope.formData = {}; // clear search form
    }
  };
});
