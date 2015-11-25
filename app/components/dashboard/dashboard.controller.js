(function (angular, undefined) {
	'use strict';
	/* create controller */
	function DashboardController($routeParams, $location, $interval, $mdDialog, data, graphs) {
		var ctrl = this,
			config = {
				graphs: [
					'jeopardy',
					'sla',
					'volume',
					'escalations'
				]
			},
			findTeamName = function findTeamName(id) {
				var team;
				ctrl.teams.some(function (v) {
					if (v.id === id) {
						team = v.name;
						return true;
					}
					return false;
				});
				return team || 'Invalid Team ID';
			},
			updateHeader = function updateHeader(text) {
				var header = text || ctrl.team.name;
				ctrl.header = header;
			},
			updateGraph = function updateGraph(graph) {
				
			},
			showGraph = function showGraph(event, graph) {
				$mdDialog.show({
					templateUrl: 'app/components/dashboard/graph.modal.htm',
					controller: 'base.modal',
					controllerAs: 'ctrl',
					locals: {
						name: graph
					},
					bindToController: true,
					parent: angular.element(document.body),
					targetEvent: event,
					clickOutsideToClose: true
				});
			},
			changeTeam = function changeTeam(newTeam) {
				// cache new team
				ctrl.team.id = newTeam.id;
				ctrl.team.name = newTeam.name || findTeamName(newTeam.id);
				// update the header
				updateHeader(newTeam.name);
				// update the URL
				$location.path('dashboard/' + newTeam.id);
			},
			calculateTotals = function calculateTotals(data) {
				var totals = [],
					total,
					arrays = data.length,
					array;
				data[0].forEach(function (v, i, a) {
					total = 0;
					for (array = 0; array < arrays; array = array + 1) {
						total += data[array][i];
					}
					totals.push(total);
				});
				return totals;
			},
			buildGraphs = function buildGraphs() {
				config.graphs.forEach(function (v, i, a) {
					var name = v.toLowerCase(),
						graph = data.dashboard.graph().graph;
					graphs.save(name, graph);
					// calculate totals
					graphs.save((name + 'Total'), {
						data: [calculateTotals(graph.data)],
						labels: graph.labels,
						series: ['Cumulative Totals']
					});
				});
			},
			init = function init() {
				// assign properties and methods to controller //
				// retrieve team list
				ctrl.teams = data.dashboard.teams().teams;
				// current team object
				ctrl.team = {
					id: $routeParams.teamId || 'all',
					name: findTeamName($routeParams.teamId || 'all')
				};
				// init graph data object
				buildGraphs();
				// set header
				updateHeader();
				// public methods
				ctrl.changeTeam = changeTeam;
				ctrl.showGraph = showGraph;
				
				$interval(function () {
					var graph = graphs.save('jeopardy', data.dashboard.graph().graph);
					graphs.save('jeopardyTotal', {
						data: [calculateTotals(graph.data)],
						labels: graph.labels,
						series: ['Cumulative Totals']
					});
				}, 2500);
			};
		// this controller auto-inits
		init();
		console.log('DashboardController', ctrl);
	}
	DashboardController.$inject = [
		'$routeParams',
		'$location',
		'$interval',
		'$mdDialog',
		'data',
		'graphs'
	];
	/* add controller */
	angular.module('alccDash')
		.controller('dashboard', DashboardController);
}(angular));
