(function (window, undefined) {
	'use strict';
	angular.module('alccDash', ['ngRoute'])
		.config(function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'app/components/dashboard/dashboard.htm'
				})
				.when('/dashboard/:channel', {
					templateUrl: 'app/components/dashboard/dashboard.htm'
				})
				.when('/scorecard/:cardname', {
					templateUrl: 'app/components/scorecard/scorecard.htm'
				});
		});
}(window || this));