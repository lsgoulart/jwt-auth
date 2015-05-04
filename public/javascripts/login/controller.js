(function(angular){
	'use strict';

	angular.module('App.login.controller', [])
		.controller('LoginController', LoginController);

	function LoginController($scope, $localStorage, $location, toastr, Auth) {
		var vm = this;

		vm.login = function(){
			if(!$scope.login){
				toastr.warning('Preencha os campos obrigatórios!');
			} else if(!$scope.login.email){
				toastr.warning('Preencha seu e-mail!');
			} else if(!$scope.login.password){
				toastr.warning('Preencha sua senha!');
			} else{
				Auth.login($scope.login)
					.success(function(user){
						if(user.type === false){
							toastr.error(user.data);
						} else {
							Auth.setUserToken(user.token);
							$location.path('/me');

							toastr.info('Conectando...');
						}
					}, function(err){
						console.log(err);
					});
			}
		};
	}

})(angular);