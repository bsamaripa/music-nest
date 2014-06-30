var music-nest= angular.module('music-nest',[]);

music-nest.controller('artist-input')function ($scope) {
		$scope.master = {};

		$scope.update = function(user){
			$scope.master = angular.copy(user);
		};
	}