(function(angular){
	'use strict';

	angular.module('App.login.services', [])
		.factory('Auth', function($http, $localStorage){
			var baseUrl = '/auth';

			function urlBase64Decode(str) {
	            var output = str.replace('-', '+').replace('_', '/');
	            switch (output.length % 4) {
	                case 0:
	                    break;
	                case 2:
	                    output += '==';
	                    break;
	                case 3:
	                    output += '=';
	                    break;
	                default:
	                    throw 'Cadeia de caracteres base64url inválida!';
	            }
	            return window.atob(output);
	        };

			return {
				login: function(user) {
					return $http.post(baseUrl + '/login', user);
				},

				logout: function(){

				},

				register: function(user){
					return $http.post(baseUrl + '/signup', user);
				},

				setUserToken: function(token){
					$localStorage.token = token;
				},

				getUserFromToken: function() {
					var token = $localStorage.token;
					var user = {};
					if(typeof token !== 'undefined') {
						var encoded = token.split('.')[1];
						user = JSON.parse(urlBase64Decode(encoded));
					}

					return user;
				}
			};
		})
		.factory('TokenInterceptor', function ($q, $localStorage, $location) {
		    return {
		        request: function (config) {
		            config.headers = config.headers || {};
		            if ($localStorage.token) {
		                config.headers.Authorization = $localStorage.token;
		            }
		            return config;
		        },

		        requestError: function(rejection) {
		            return $q.reject(rejection);
		        },

		        /* Set Authentication.isAuthenticated to true if 200 received */
		        response: function (response) {
		            return response || $q.when(response);
		        },

		        /* Revoke client authentication if 401 is received */
		        responseError: function(rejection) {
		            if (rejection != null && rejection.status === 401) {
		                delete $localStorage.token;
		                $location.path("/login");
		            }

		            return $q.reject(rejection);
		        }
		    };
		});

})(angular);