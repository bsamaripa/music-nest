angular.module('artistService', [])

// super simple service
// each function returns a promise object
.factory('Artists', function($http) {
  return {
    create: function(artistData) {
      return $http.post('/api/artists', artistData);
    }
  };
});
