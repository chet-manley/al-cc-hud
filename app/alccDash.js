(function (window, angular, undefined) {
	'use strict';
	/* create our app module */
	angular.module('alccDash', ['ngRoute']);
	
	/* create our app routes */
	angular.module('alccDash')
		.config(function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'app/components/dashboard/dashboard.htm'
				})
				.when('/dashboard/:channel', {
					templateUrl: 'app/components/dashboard/dashboard.htm'
				})
				.when('/scorecards/:type', {
					templateUrl: 'app/components/scorecards/scorecards.htm'
				});
		});
}(window || this, angular));
