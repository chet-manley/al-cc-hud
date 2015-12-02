(function (angular, undefined) {
	'use strict';
	/* define service */
	function dataService($http, $q) {
		var svc = {},
			// generate positive integer(s) between min and max, inclusive
			randGen = function randGen(min, max, iterations) {
				var i, numbers = [];
				if (typeof iterations !== 'number') {iterations = 1; }
				for (i = 0; i < iterations; i = i + 1) {
					numbers.push(Math.floor(Math.random() * (max - min + 1) + min));
				}
				return numbers;
			},
			epochToString = function epochToString(t) {
				var str,
					hour,
					months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
							  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				t = new Date(t);
				hour = t.getHours();
				hour = hour <= 12 ? hour + 'A' : hour - 12 + 'P';
				str = months[t.getMonth()]
					+ ('0' + t.getDate()).slice(-2) + '-'
					+ hour;
				return str;
			},
			// interval in hours
			timeGen = function timeGen(iterations, interval) {
				var now = Date.now(),
					times = [],
					time = now,
					i,
					roundBy = function roundBy(n, r) {
						return Math.round(n / r) * r;
					};
				if (typeof iterations !== 'number') {iterations = 1; }
				if (typeof interval !== 'number') {interval = 12; }
				for (i = 0; i < iterations; i = i + 1) {
					// (msec * sec * min * hr)
					time = time - (1000 * 60 * 60 * interval);
					times.unshift(epochToString(time));
				}
				return times;
			},
			// transform error responses
			handleError = function handleError(response) {
				// normalize unexpected returns
				if (!angular.isObject(response.data) ||
						!response.data.message) {
					return ($q.reject("An unknown error occurred."));
				}
				// otherwise, use expected error message
				return ($q.reject(response.data.message));
			},
			// unwrap data from API payload
			handleSuccess = function handleSuccess(response) {
				return (response.data);
			};
		
		/**
		 * TODO
		 * Add real $http routes to retrieve data from API.
		 * Currently returns fake data.
		 */
		svc.dashboard = {
			// GET only
			teams: function teams() {
				return {
					teams: [
						{
							name: 'All Teams',
							id: 'all'
						},
						{
							name: 'Customer Care',
							id: '12345'
						},
						{
							name: 'NOC',
							id: '23456'
						},
						{
							name: 'SOC',
							id: '34567'
						}
					]
				};
			},
			graph: function graph(series) {
				var data = {};
				series = series ? series.toLowerCase() : 'all';
				// GET only
				switch (series) {
				case 'customer care':
					data.graph = {
						labels: timeGen(6),
						series: [
							'Customer Care',
							'Customer Care Admin'
						],
						data: [
							randGen(200, 250, 6),
							randGen(200, 250, 6)
						]
					};
					break;
				case 'noc':
					data.graph = {
						labels: timeGen(6),
						series: [
							'NOC 1',
							'NOC 2',
							'WSM Premier'
						],
						data: [
							randGen(200, 250, 6),
							randGen(200, 250, 6),
							randGen(200, 250, 6)
						]
					};
					break;
				case 'all':
					
				default:
					data.graph = {
						labels: timeGen(6),
						series: [
							'Customer Care',
							'NOC',
							'SOC'
						],
						data: [
							randGen(200, 250, 6),
							randGen(200, 250, 6),
							randGen(200, 250, 6)
						]
					};
				}
				return data;
			}
		};
		svc.scorecard = {
			// dynamic scorecard control data
			controls: {
				individual: function getIndividuals() {
					return {
						names: [
							'Shelton Jenkins',
							'Samuel King',
							'Josh Gardner',
							'Matthew Moreno',
							'Suzanne Thompson'
						],
						times: [
							'Weekly',
							'Monthly'
						]
					};
				},
				team: function getTeams() {
					return {
						names: [
							'Customer Care',
							'NOC',
							'SOC'
						],
						times: [
							'Weekly',
							'Monthly'
						]
					};
				},
				department: function getDepartments() {
					return {
						names: [
							'Customer Care',
							'NOC',
							'SOC',
							'TOC',
							'WSM'
						],
						times: [
							'Weekly',
							'Monthly'
						]
					};
				}
			},
			// view scorecard data routes
			individual: {
				// CRUD
				create: function create() {
					
				}, // END individual create
				read: function read(name, time) {
					var data = {
						metadata: {
							name: name,
							timeframe: time
						},
						scorecard: {
							rows: [
								{
									kpi: 'First Touch Resolve',
									weight: 25,
									goals: {
										standard: 90,
										high: 95,
										low: 70
									},
									results: randGen(65, 100, 4)
								},
								{
									kpi: 'Case/Call Assessment',
									weight: 10,
									goals: {
										standard: 95,
										high: 100,
										low: 90
									},
									results: randGen(85, 100, 4)
								},
								{
									kpi: 'Agent Efficiency',
									weight: 15,
									goals: {
										standard: 80,
										high: 90,
										low: 70
									},
									results: randGen(65, 100, 4)
								},
								{
									kpi: 'Agent Utilization',
									weight: 25,
									goals: {
										standard: 80,
										high: 90,
										low: 70
									},
									results: randGen(65, 100, 4)
								},
								{
									kpi: 'Agent Satisfaction',
									weight: 15,
									goals: {
										standard: 85,
										high: 95,
										low: 60
									},
									results: randGen(55, 100, 4)
								},
								{
									kpi: 'Customer Satisfaction',
									weight: 10,
									goals: {
										standard: 90,
										high: 95,
										low: 80
									},
									results: randGen(75, 100, 4)
								}
							]
						}
					};
					data.scorecard.headers = time.toLowerCase() === 'weekly'
						? [
							'Key Performance Indicator',
							'Weight',
							'Goal',
							'Result Nov. 8-14',
							'Result Nov. 1-7',
							'Result Oct. 25-31',
							'Result Oct. 18-24'
						]
						: [
							'Key Performance Indicator',
							'Weight',
							'Goal',
							'Result Nov.',
							'Result Oct.',
							'Result Sep.',
							'Result Aug.'
						];
					return data;
				}, // END individual read
				update: function update() {

				}, // END individual update
				del: function del() {

				} // END individual delete
			}, // END 'individual' CRUD routes
			team: {
				// CRUD
				create: function create() {
					
				}, // END team create
				read: function read(name, time) {
					var data = {
						metadata: {
							name: name,
							timeframe: time
						},
						scorecard: {
							rows: [
								{
									kpi: 'First Touch Resolve',
									weight: 25,
									goals: {
										standard: 90,
										high: 95,
										low: 70
									},
									results: randGen(65, 100, 4)
								},
								{
									kpi: 'Case/Call Assessment',
									weight: 10,
									goals: {
										standard: 95,
										high: 100,
										low: 90
									},
									results: randGen(85, 100, 4)
								},
								{
									kpi: 'Team Efficiency',
									weight: 15,
									goals: {
										standard: 80,
										high: 90,
										low: 70
									},
									results: randGen(65, 100, 4)
								},
								{
									kpi: 'Team Utilization',
									weight: 25,
									goals: {
										standard: 80,
										high: 90,
										low: 70
									},
									results: randGen(65, 100, 4)
								},
								{
									kpi: 'Team Satisfaction',
									weight: 15,
									goals: {
										standard: 85,
										high: 95,
										low: 60
									},
									results: randGen(55, 100, 4)
								},
								{
									kpi: 'Customer Satisfaction',
									weight: 10,
									goals: {
										standard: 90,
										high: 95,
										low: 80
									},
									results: randGen(75, 100, 4)
								}
							]
						}
					};
					data.scorecard.headers = time.toLowerCase() === 'weekly'
						? [
							'Key Performance Indicator',
							'Weight',
							'Goal',
							'Result Nov. 8-14',
							'Result Nov. 1-7',
							'Result Oct. 25-31',
							'Result Oct. 18-24'
						]
						: [
							'Key Performance Indicator',
							'Weight',
							'Goal',
							'Result Nov.',
							'Result Oct.',
							'Result Sep.',
							'Result Aug.'
						];
					return data;
				}, // END team read
				update: function update() {

				}, // END team update
				del: function del() {

				} // END team delete
			}, // END 'team' CRUD routes
			department: {
				// CRUD
				create: function create() {
					
				}, // END department create
				read: function read(name, time) {
					var data = {
						metadata: {
							name: name,
							timeframe: time
						},
						scorecard: {
							rows: [
								{
									kpi: 'First Touch Resolve',
									weight: 25,
									goals: {
										standard: 90,
										high: 95,
										low: 70
									},
									results: randGen(65, 100, 4)
								},
								{
									kpi: 'Case/Call Assessment',
									weight: 10,
									goals: {
										standard: 95,
										high: 100,
										low: 90
									},
									results: randGen(85, 100, 4)
								},
								{
									kpi: 'Department Efficiency',
									weight: 15,
									goals: {
										standard: 80,
										high: 90,
										low: 70
									},
									results: randGen(65, 100, 4)
								},
								{
									kpi: 'Department Utilization',
									weight: 25,
									goals: {
										standard: 80,
										high: 90,
										low: 70
									},
									results: randGen(65, 100, 4)
								},
								{
									kpi: 'Department Satisfaction',
									weight: 15,
									goals: {
										standard: 85,
										high: 95,
										low: 60
									},
									results: randGen(55, 100, 4)
								},
								{
									kpi: 'Customer Satisfaction',
									weight: 10,
									goals: {
										standard: 90,
										high: 95,
										low: 80
									},
									results: randGen(75, 100, 4)
								}
							]
						}
					};
					data.scorecard.headers = time.toLowerCase() === 'weekly'
						? [
							'Key Performance Indicator',
							'Weight',
							'Goal',
							'Result Nov. 8-14',
							'Result Nov. 1-7',
							'Result Oct. 25-31',
							'Result Oct. 18-24'
						]
						: [
							'Key Performance Indicator',
							'Weight',
							'Goal',
							'Result Nov.',
							'Result Oct.',
							'Result Sep.',
							'Result Aug.'
						];
					return data;
				}, // END department read
				update: function update() {

				}, // END department update
				del: function del() {

				} // END department delete
			} // END 'department' CRUD routes
		}; // END scorecard routes
		
		return svc;
	}
	dataService.$inject = ['$http', '$q'];
	/* add service */
	angular.module('alccDash')
		.factory('data', dataService);
}(angular));
