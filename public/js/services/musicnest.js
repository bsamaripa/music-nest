angular.module('musicnest', [])

// super simple service
// each function returns a promise object
.factory('Artists', function($http) {
  return {
    get: function() {
      return $http.get('/api/artists');
    },
    create: function(todoData) {
      return $http.post('/api/artists', artistData);
    },
    delete: function(id) {
      return $http.delete('/api/artists' + id);
    }
  }
});
