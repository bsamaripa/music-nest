angular.module('artistController', [])

.controller('mainController', function($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get first artist and show it
  $http.get('/api/artists')
    .success(function(data) {
      $scope.artists = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Fetch specific artist
  $http.get('/api/artists')
    .success(function(data) {
      $scope.formData = {}; // clear form
      $scope.artists = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createArtist = function() {
    $http.post('/api/artists', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clear the form so our user is ready to enter another
        $scope.artists = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // delete a artist after checking it
  $scope.deleteArtist = function(id) {
    $http.delete('/api/artists/' + id)
      .success(function(data) {
        $scope.artists = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

});
