(function (window, angular, undefined) {
	'use strict';
	/* create our app module */
	angular.module('alccDash', ['ngRoute', 'chart.js']);
	
	/* create our app routes */
	angular.module('alccDash')
		.config(function ($routeProvider) {
			$routeProvider
				.when('/', {
					redirectTo: '/dashboard/all'
				})
				.when('/dashboard/:channelId', {
					templateUrl: 'app/components/dashboard/dashboard.htm',
					controller: 'dashboard',
					controllerAs: 'ctrl'
				})
				.when('/scorecards/:type', {
					templateUrl: 'app/components/scorecards/scorecards.htm',
					controller: 'scorecards',
					controllerAs: 'ctrl'
				});
		});
}(window || this, angular));
