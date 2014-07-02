angular.module('artistController', [])

// inject the Artist service factory into our controller
.controller('mainController', function($scope, $http, Artists) {
  $scope.formData = {};
  $scope.loading = true;

  // Query ==================================================================
  // when submitting the add form, send the text to the node API
  $scope.searchArtist = function() {
    $scope.loading = true;

    // if form is empty, nothing will happen
    if ($scope.formData.text !== undefined) {
      // call the create function from our service (returns a promise object)
      Artists.create($scope.formData)
      // if successful creation, call our get function to get all the new artists
      .success(function(data) {
        $scope.loading = false;
        $scope.formData = {}; // clear search form
        Artists.get()
          .success(function(data) {
            $scope.artist = data;
          });
      });
    }
  };
});
