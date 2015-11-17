(function (angular, undefined) {
	'use strict';
	/* create controller */
	function DashboardController($routeParams, $location, data) {
		var ctrl = this,
			findChannelName = function findChannelName(id) {
				var channel;
				ctrl.channels.some(function (v) {
					if (v.id === id) {
						channel = v.name;
						return true;
					}
					return false;
				});
				return channel || 'Invalid Channel ID';
			},
			chartUpdate = function chartUpdate(opt) {
				
			},
			updateHeader = function updateHeader(text) {
				var header = text || ctrl.channel.name;
				ctrl.header = header;
			},
			changeChannel = function changeChannel(newChannel) {
				// cache new channel
				ctrl.channel.id = newChannel.id;
				ctrl.channel.name = newChannel.name || findChannelName(newChannel.id);
				// update the header
				updateHeader(newChannel.name);
				// update the URL
				//$location.search('channelId', newChannel.id);
			},
			updateGraph = function updateGraph() {
				
			},
			init = function init() {
				// assign properties and methods to controller //
				// retrieve channel list
				ctrl.channels = data.dashboard.channels().channels;
				// current channel object
				ctrl.channel = {
					id: $routeParams.channelId || 'all',
					name: findChannelName($routeParams.channelId || 'all')
				};
				// retrieve test graph data
				ctrl.testGraph = data.dashboard.graph().graph;
				// set header
				updateHeader();
				// public methods
				ctrl.changeChannel = changeChannel;
			};
		// this controller auto-inits
		init();
		console.log('DashboardController', ctrl);
	}
	DashboardController.$inject = ['$routeParams', '$location', 'data'];
	/* add controller */
	angular.module('alccDash')
		.controller('dashboard', DashboardController);
}(angular));
