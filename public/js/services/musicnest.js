angular.module('artistService', [])

.factory('Artists', function($http) {
  return {
    get: function() {
      return $http.get('/api/v1/artists');
    },
    create: function(artistData) {
      // Check if result valid, if not create. Then return only relevant after
      return $http.post('/api/v1/artists', artistData);
    }
  };
});
