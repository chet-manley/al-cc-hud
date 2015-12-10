(function (angular, undefined) {
	'use strict';
	/* create directive */
	function flexGraph() {
		var Controller = function Controller($scope, $mdDialog, graphs) {
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
				},
				showGraphModal = function showGraphModal($event) {
					$mdDialog.show({
						templateUrl: 'app/components/dashboard/graph.modal.htm',
						controller: 'base.modal',
						controllerAs: 'ctrl',
						locals: {
							name: ctrl.name,
							header: ctrl.header
						},
						bindToController: true,
						parent: angular.element(document.body),
						openFrom: $scope.container,
						closeTo: $scope.container,
						clickOutsideToClose: true
					});
				},
				init = function init() {
					// request graphs
					ctrl.graphs = graphs.get();
					// set defaults
					ctrl.type = ctrl.type || 'Line';
					ctrl.header = ctrl.header || '';
					ctrl.options = ctrl.graphs[ctrl.name].options || options();
					// set public methods
					ctrl.expand = showGraphModal;
				};
			// this controller auto-inits
			init();
		},
			linkFn = function linkFn(scope, element, attrs) {
				// link non-value attributes
				if (attrs.hasOwnProperty('graphExpand')) {
					scope.expandable = true;
				}
				// cache container element
				scope.container = element[0];
			};
		Controller.$inject = ['$scope', '$mdDialog', 'graphs'];
		
		return {
			restrict: 'AE',
			templateUrl: 'app/shared/flexGraph.htm',
			scope: {},
			bindToController: {
				'name': '@graphName',
				'type': '@?graphType',
				'header': '@?graphHeader',
				'onClick': '=?graphClick'
			},
			controller: Controller,
			controllerAs: 'graphCtrl',
			link: linkFn
		};
	}
	/* add directive */
	angular.module('alccDash')
		.directive('flexGraph', flexGraph);
}(angular));
