(function (angular, undefined) {
	'use strict';
	/* create controller */
	function DashboardController($routeParams, $location, data) {
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
			chartUpdate = function chartUpdate(opt) {
				
			},
			updateHeader = function updateHeader(text) {
				var header = text || ctrl.team.name;
				ctrl.header = header;
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
			updateGraph = function updateGraph() {
				
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
				// retrieve test graph data
				ctrl.testGraph = data.dashboard.graph().graph;
				// set header
				updateHeader();
				// public methods
				ctrl.changeTeam = changeTeam;
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
