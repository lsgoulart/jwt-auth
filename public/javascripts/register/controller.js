(function(angular){
	'use strict';

	angular.module('App.register.controller', [])
		.controller('RegisterController', RegisterController);

	function RegisterController($scope, $location, Auth, toastr){
		var vm = this;

		vm.signup = function(){
			var user = {};
			if(!$scope.username) {
				toastr.error('Digite seu nome de usuário!');
			} else if(!$scope.email) {
				toastr.error('Digite seu e-mail!');
			} else if(!$scope.password) {
				toastr.error('Escolha uma senha!');
			} else {
				user = {
					username: $scope.username,
					email: $scope.email,
					password: $scope.password
				};

				Auth.register(user).success(function(newUser){
					if(newUser.type){
						Auth.setUserToken(newUser.token);
						$location.path('/me');

						toastr.info('Conectando...');
					} else {
						toastr.error(newUser.data);
					}
				}, function(err){
					toastr.error(err);
				});
			}
		}
	}

})(angular);