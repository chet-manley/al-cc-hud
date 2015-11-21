(function (angular, undefined) {
	'use strict';
	/* create controller */
	function DashboardController($routeParams, $location, data, graphs) {
		var ctrl = this,
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
			changeTeam = function changeTeam(newTeam) {
				// cache new team
				ctrl.team.id = newTeam.id;
				ctrl.team.name = newTeam.name || findTeamName(newTeam.id);
				// update the header
				updateHeader(newTeam.name);
				// update the URL
				$location.path('dashboard/' + newTeam.id);
			},
			buildGraph = function buildGraph(graph, type) {
				ctrl.graphs[graph] = data.dashboard.graph(type).graph;
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
				ctrl.graphs = {};
				buildGraph('jeopardyTotal', 'total');
				buildGraph('jeopardy', 'indv');
				buildGraph('slaTotal', 'total');
				buildGraph('sla', 'indv');
				buildGraph('volumeTotal', 'total');
				buildGraph('volume', 'indv');
				buildGraph('escalationsTotal', 'total');
				buildGraph('escalations', 'indv');
				//ctrl.testGraph = data.dashboard.graph('total').graph;
				// set header
				updateHeader();
				// public methods
				ctrl.changeTeam = changeTeam;
			};
		// this controller auto-inits
		init();
		console.log('DashboardController', ctrl);
	}
	DashboardController.$inject = [
		'$routeParams',
		'$location',
		'data',
		'graphs'
	];
	/* add controller */
	angular.module('alccDash')
		.controller('dashboard', DashboardController);
}(angular));
