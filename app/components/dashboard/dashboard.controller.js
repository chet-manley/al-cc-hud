(function (angular, undefined) {
	'use strict';
	/* create controller */
	function DashboardController($routeParams, data) {
		var ctrl = this,
			channelId = $routeParams.channelId,
			chart = data.dashboard.chart().chart,
			channels = data.dashboard.channels().channels,
			chartUpdate = function chartUpdate(opt) {
				
			},
			updateHeader = function updateHeader(text) {
				var header = text || channelId;
				ctrl.header = text || header;
			},
			init = function init() {
				// assign properties and methods to controller
				ctrl.channelId = channelId;
				ctrl.header = 'All Channels';
			};
		
		ctrl.channels = channels;
		ctrl.chartUpdate = chartUpdate;
		ctrl.chart = chart;
		
		// this controller auto-inits
		init();
		console.log('DashboardController', ctrl);
	}
	DashboardController.$inject = ['$routeParams', 'data'];
	/* add controller */
	angular.module('alccDash')
		.controller('dashboard', DashboardController);
}(angular));
