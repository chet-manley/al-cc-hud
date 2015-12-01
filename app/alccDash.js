(function (window, angular, undefined) {
	'use strict';
	/* create our app module */
	angular.module('alccDash', ['ngRoute', 'ngMaterial', 'chart.js']);
	
	/* create our app routes */
	angular.module('alccDash')
		.config(function ($routeProvider, $mdThemingProvider) {
			$routeProvider
				.when('/', {
					redirectTo: '/dashboard'
				})
				.when('/dashboard/:teamId?', {
					templateUrl: 'app/components/dashboard/dashboard.htm',
					controller: 'dashboard',
					controllerAs: 'ctrl',
					reloadOnSearch: false
				})
				.when('/scorecards/:type', {
					templateUrl: 'app/components/scorecards/scorecards.htm',
					controller: 'scorecards',
					controllerAs: 'ctrl'
				});
			$mdThemingProvider.definePalette('al-orange', {
				'50': '#ffbf80',
				'100': '#ffb266',
				'200': '#ffa54d',
				'300': '#ff9933',
				'400': '#ff8c1a',
				'500': '#FF7F00',
				'600': '#e67200',
				'700': '#cc6600',
				'800': '#b35900',
				'900': '#994c00',
				'A100': '#ffcc99',
				'A200': '#ffd9b3',
				'A400': '#ffe5cc',
				'A700': '#804000'
			});
			$mdThemingProvider.definePalette('al-grey', {
				'50': '#939393',
				'100': '#868686',
				'200': '#797979',
				'300': '#6c6c6c',
				'400': '#606060',
				'500': '#535353',
				'600': '#464646',
				'700': '#393939',
				'800': '#2d2d2d',
				'900': '#202020',
				'A100': '#9f9f9f',
				'A200': '#acacac',
				'A400': '#b9b9b9',
				'A700': '#131313'
			});
			$mdThemingProvider.definePalette('al-dark-grey', {
				'50': '#7c7c7c',
				'100': '#6f6f6f',
				'200': '#626262',
				'300': '#555555',
				'400': '#494949',
				'500': '#3C3C3C',
				'600': '#2f2f2f',
				'700': '#222222',
				'800': '#161616',
				'900': '#090909',
				'A100': '#888888',
				'A200': '#959595',
				'A400': '#a2a2a2',
				'A700': '#000000'
			});
			$mdThemingProvider
				.theme('default')
				.primaryPalette('al-orange')
				.accentPalette('al-dark-grey')
				.warnPalette('red')
				.backgroundPalette('grey');
		});
}(window || this, angular));
