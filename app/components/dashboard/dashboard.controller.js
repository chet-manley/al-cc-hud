(function (angular, undefined) {
	'use strict';
	/* create controller */
	function DashboardController($routeParams, data) {
		var ctrl = this,
			chart = data.dashboard.chart().chart,
			channels = data.dashboard.channels().channels,
			chartUpdate = function chartUpdate(opt) {
				
			};
		
		// assign properties and methods to controller
		ctrl.channelId = $routeParams.channelId;
		ctrl.channels = channels;
		ctrl.chartUpdate = chartUpdate;
		ctrl.chart = chart;
		console.log('DashboardController', ctrl);
	}
	/* add controller */
	angular.module('alccDash')
		.controller('dashboard', DashboardController);
}(angular));
