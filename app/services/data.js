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
							name: 'Team 1',
							id: '12345'
						},
						{
							name: 'Team 2',
							id: '23456'
						},
						{
							name: 'Team 3',
							id: '34567'
						},
						{
							name: 'Team 4',
							id: '45678'
						}
					]
				};
			},
			graph: function graph(name, series) {
				var data = {};
				// GET only
				if (name === 'total') {
					data.graph = {
						labels: timeGen(6),
						series: [
							'Cumulative Total'
						],
						data: [
							randGen(150, 300, 6)
						]
					};
				}
				if (name === 'indv') {
					data.graph = {
						labels: timeGen(6),
						series: [
							'Team 1',
							'Team 2',
							'Team 3',
							'Team 4'
						],
						data: [
							randGen(150, 300, 6),
							randGen(150, 300, 6),
							randGen(150, 300, 6),
							randGen(150, 300, 6)
						]
					};
				}
				/*
				{
					graph: {
						labels: [
							'Label 1',
							'Label 2',
							'Label 3',
							'Label 4',
							'Label 5',
							'Label 6',
							'Label 7'
						],
						series: [
							'Series A',
							'Series B',
							'Series C'
						],
						data: [
							randGen(10, 100, 7),
							randGen(10, 100, 7),
							randGen(10, 100, 7)
						]
					}
				};
				*/
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
							'team 1',
							'team 2',
							'team 3',
							'team 4'
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
									results: randGen(60, 100, 4)
								},
								{
									kpi: 'Case/Call Assessment',
									weight: 15,
									goals: {
										standard: 95,
										high: 97,
										low: 75
									},
									results: randGen(70, 100, 4)
								},
								{
									kpi: 'Agent Efficiency',
									weight: 15,
									goals: {
										standard: 90,
										high: 95,
										low: 85
									},
									results: randGen(50, 100, 4)
								},
								{
									kpi: 'Agent Utilization',
									weight: 10,
									goals: {
										standard: 90,
										high: 95,
										low: 85
									},
									results: randGen(50, 100, 4)
								},
								{
									kpi: 'Agent Satisfaction',
									weight: 15,
									goals: {
										standard: 85,
										high: 90,
										low: 70
									},
									results: randGen(60, 100, 4)
								},
								{
									kpi: 'Customer Satisfaction',
									weight: 20,
									goals: {
										standard: 90,
										high: 95,
										low: 70
									},
									results: randGen(60, 100, 4)
								}
							],
							footer: {
								goals: {
									standard: 90,
									high: 95,
									low: 85
								}
							}
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
									results: randGen(60, 100, 4)
								},
								{
									kpi: 'Case/Call Assessment',
									weight: 15,
									goals: {
										standard: 95,
										high: 97,
										low: 75
									},
									results: randGen(70, 100, 4)
								},
								{
									kpi: 'Team Efficiency',
									weight: 15,
									goals: {
										standard: 90,
										high: 95,
										low: 85
									},
									results: randGen(50, 100, 4)
								},
								{
									kpi: 'Team Utilization',
									weight: 10,
									goals: {
										standard: 90,
										high: 95,
										low: 85
									},
									results: randGen(50, 100, 4)
								},
								{
									kpi: 'Team Satisfaction',
									weight: 15,
									goals: {
										standard: 85,
										high: 90,
										low: 70
									},
									results: randGen(60, 100, 4)
								},
								{
									kpi: 'Customer Satisfaction',
									weight: 20,
									goals: {
										standard: 90,
										high: 95,
										low: 70
									},
									results: randGen(60, 100, 4)
								}
							],
							footer: {
								goals: {
									standard: 90,
									high: 95,
									low: 85
								}
							}
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
									results: randGen(60, 100, 4)
								},
								{
									kpi: 'Case/Call Assessment',
									weight: 15,
									goals: {
										standard: 95,
										high: 97,
										low: 75
									},
									results: randGen(70, 100, 4)
								},
								{
									kpi: 'Department Efficiency',
									weight: 15,
									goals: {
										standard: 90,
										high: 95,
										low: 85
									},
									results: randGen(50, 100, 4)
								},
								{
									kpi: 'Department Utilization',
									weight: 10,
									goals: {
										standard: 90,
										high: 95,
										low: 85
									},
									results: randGen(50, 100, 4)
								},
								{
									kpi: 'Department Satisfaction',
									weight: 15,
									goals: {
										standard: 85,
										high: 90,
										low: 70
									},
									results: randGen(60, 100, 4)
								},
								{
									kpi: 'Customer Satisfaction',
									weight: 20,
									goals: {
										standard: 90,
										high: 95,
										low: 70
									},
									results: randGen(60, 100, 4)
								}
							],
							footer: {
								goals: {
									standard: 90,
									high: 95,
									low: 85
								}
							}
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
