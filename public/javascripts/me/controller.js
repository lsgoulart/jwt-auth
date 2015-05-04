(function(angular){
	'use strict';

	angular.module('App.me.controller', [])
		.controller('MeController', MeController);

	function MeController($scope, Auth){
		console.log('Me');
		$scope.user = Auth.getUserFromToken();
		console.log($scope.user);
	}

})(angular);