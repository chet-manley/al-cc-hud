(function (angular, undefined) {
	'use strict';
	/* create controller */
	function DashboardController($routeParams, $location, $interval, $mdDialog, data, graphs) {
		var ctrl = this,
			config = {
				graphs: [
					'sl-jeopardy',
					'sl-exceeded',
					'volume',
					'escalations',
					'ftr'
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
				if (ctrl.team.id !== 'all') {
					header += ' team';
				}
				ctrl.header = header;
			},
			updateGraph = function updateGraph(graph) {
				
			},
			showGraphModal = function showGraphModal(event, graph, header) {
				$mdDialog.show({
					templateUrl: 'app/components/dashboard/graph.modal.htm',
					controller: 'base.modal',
					controllerAs: 'ctrl',
					locals: {
						name: graph,
						header: ctrl.team.name + ' ' + header
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
			buildTotalsGraph = function buildTotalsGraph(graph) {
				var tGraph = {
					labels: graph.labels
				};
				// check for sla/slo
				tGraph.data = graph.sla
					? [graph.totals.sla, graph.totals.slo]
					: [graph.totals.total];
				tGraph.series = graph.sla
					? ['SLA Totals', 'SLO Totals']
					: ['Cumulative Totals'];
				return tGraph;
			},
			buildGraphs = function buildGraphs(team) {
				team = angular.lowercase(team);
				config.graphs.forEach(function (v, i, a) {
					var name = v.toLowerCase(),
						graph = data.dashboard
							.graph({
								team: team,
								id: name
							}).graph;
					graphs.save(name, graph);
					// calculate totals
					graphs.save((name + 'Total'), buildTotalsGraph(graph));
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
				buildGraphs(ctrl.team.name);
				// set header
				updateHeader();
				// public methods
				ctrl.changeTeam = changeTeam;
				ctrl.showGraph = showGraphModal;
			};
		// this controller auto-inits
		init();
		/*
		$interval(function () {
			var graph = graphs.save('jeopardy', data.dashboard.graph().graph);
			graphs.save('jeopardyTotal', {
				data: [calculateTotals(graph.data)],
				labels: graph.labels,
				series: ['Cumulative Totals']
			});
		}, 5000);
		*/
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
