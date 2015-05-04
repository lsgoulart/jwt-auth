(function(angular){
	'use strict';

	angular.module('App', [
		'ngRoute',
		'ngAnimate',
		'toastr',
		'ngStorage',

		'App.controllers',
		'App.services',
		'App.directives'
	])
	.config(function($routeProvider, $httpProvider, $locationProvider){
		$routeProvider
			.when('/login', {
				controller: 'LoginController',
				controllerAs: 'vm',
				requiredAuth: false,
				templateUrl: '/javascripts/login/view.html'
			})
			.when('/register', {
				controller: 'RegisterController',
				controllerAs: 'vm',
				requiredAuth: false,
				templateUrl: '/javascripts/register/view.html'
			})
			.when('/me', {
				controller: 'MeController',
				controllerAs: 'vm',
				requiredAuth: true,
				templateUrl: '/javascripts/me/view.html'
			})
			.otherwise({
				redirectTo: '/login'
			});

		$locationProvider.html5Mode(true);

	    $httpProvider.interceptors.push('TokenInterceptor');
	})
	.run(function($rootScope, $location, $localStorage){
	    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {

	        if (nextRoute.requiredAuth && !$localStorage.token) {
	            $location.path('/login');
	        }

	    });
	});

})(angular);