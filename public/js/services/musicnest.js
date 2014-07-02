angular.module('artistService', [])

.factory('Artists', function($http) {
  return {
    get: function() {
      return $http.get('/api/artists');
    },
    create: function(artistData) {
      return $http.post('/api/artists', artistData);
    }
  };
});
