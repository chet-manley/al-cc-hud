(function (angular, undefined) {
	'use strict';
	/* create directive */
	function flexGraph(graphs) {
		var Controller = function Controller() {
			var ctrl = this,
				options = function setOptions() {
					var opts = {};
					switch (ctrl.type.toLowerCase()) {
					case 'line':
						opts = {
							bezierCurve: false,
							datasetFill: false
						};
						break;
					}
					return opts;
					// request graphs
					ctrl.graphs = graphs.get();
					ctrl.options = ctrl.graphs[ctrl.name].options || options();
				};
			ctrl.type = ctrl.type || 'Line';
		};
		
		return {
			restrict: 'AE',
			templateUrl: 'app/shared/flexGraph.htm',
			scope: {},
			bindToController: {
				'type': '@graphType',
				'name': '@graphName',
				'onClick': '=graphClick'
			},
			controller: Controller,
			controllerAs: 'graphCtrl'
		};
	}
	flexGraph.$inject = ['graphs'];
	/* add directive */
	angular.module('alccDash')
		.directive('flexGraph', flexGraph);
}(angular));
