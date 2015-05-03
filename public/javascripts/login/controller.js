(function(angular){
	'use strict';

	angular.module('App.login.controller', [])
		.controller('LoginController', LoginController);

	function LoginController($scope) {
		console.log('Login Screen');
	}

})(angular);