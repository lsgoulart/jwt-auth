(function(angular){
	'use strict';

	angular.module('App.me.controller', [])
		.controller('MeController', MeController);

	function MeController($scope, $localStorage, $location, $http, toastr, Auth){
		$scope.user = Auth.getUserFromToken();
		var vm = this;

		$http.get('/api/videos').then(function(data){
			console.log(data);
		});

		vm.logout = function(){
			$localStorage.$reset();
			$location.path('/login');
		}
	}

})(angular);