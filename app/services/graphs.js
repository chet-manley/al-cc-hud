(function (angular, undefined) {
	'use strict';
	/* define service */
	function GraphsService(data) {
		var svc = this,
			graphs = {},
			saveGraph = function saveGraph(name, graph) {
				graph = graph || data.dashboard.graph().graph;
				graphs[name] = graph;
				return graphs[name];
			},
			getGraph = function getGraph(name) {
				if (!name) {return graphs; }
				return graphs[name];
			},
			init = function init() {
				svc.get = getGraph;
				svc.save = saveGraph;
			};
		init();
	}
	GraphsService.$inject = ['data'];
	/* add service */
	angular.module('alccDash')
		.service('graphs', GraphsService);
}(angular));
