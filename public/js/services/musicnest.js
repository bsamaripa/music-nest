angular.module('artistService', [])

.factory('Artists', function($http) {
  return {
    get: function() {
      return $http.get('/api/artists');
    },
    create: function(artistData) {
      // Check if result valid, if not create. Then return only relevant after
      return $http.post('/api/artists', artistData);
    }
  };
});
