(function (angular, undefined) {
	'use strict';
	/* create directive */
	function alccGraph() {
		var Controller = function Controller() {
			var ctrl = this,
				graph = ctrl.graphData || {};
			ctrl.type = ctrl.graphType || 'Line';
			ctrl.labels = graph.labels;
			ctrl.series = graph.series;
			ctrl.data = graph.data;
		};
		
		return {
			restrict: 'AE',
			templateUrl: 'app/shared/alccGraph.htm',
			scope: {},
			bindToController: {
				'graphType': '@',
				'graphData': '='
			},
			controller: Controller,
			controllerAs: 'graphCtrl'
		};
	}
	alccGraph.$inject = [];
	/* add directive */
	angular.module('alccDash')
		.directive('alccGraph', alccGraph);
}(angular));
