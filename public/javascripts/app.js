(function(angular){
	'use strict';

	angular.module('App', [
		'ngRoute',

		'App.controllers',
		'App.services',
		'App.directives'
	])
	.config(function($routeProvider, $locationProvider){
		$routeProvider
			.when('/login', {
				controller: 'LoginController',
				templateUrl: '/javascripts/login/view.html'
			})
			.otherwise({
				redirectTo: '/login'
			});
		$locationProvider.html5Mode(true);
	});

})(angular);