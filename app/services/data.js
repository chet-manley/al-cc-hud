(function (angular, undefined) {
	'use strict';
	/* define service */
	function dataService($http, $q, $timeout) {
		var svc = {},
			// generate positive integer(s) between min and max, inclusive
			randGen = function randGen(min, max, iterations, series) {
				var i, numbers = [];
				if (typeof series === 'number') {
					for (i = 0; i < series; i = i + 1) {
						numbers.push(randGen(min, max, iterations));
					}
					return numbers;
				}
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
				hour = hour <= 12 ? hour + 'AM' : hour - 12 + 'PM';
				str = months[t.getMonth()] + ' '
					+ ('0' + t.getDate()).slice(-2) + ', '
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
			// separate SLA & SLO data
			separateGraphData = function separateGraphData(graph) {
				var data = graph.data;
				graph.sla = [];
				graph.slo = [];
				// iterate over data and separate arrays
				graph.series.forEach(function (v, i, a) {
					if (v.toLowerCase().indexOf('sla') !== -1) {
						graph.sla.push(data[i]);
					}
					if (v.toLowerCase().indexOf('slo') !== -1) {
						graph.slo.push(data[i]);
					}
				});
				return graph;
			},
			totalGraphData = function totalGraphData(data) {
				if (!data) {return null; }
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
			graph: function graph(req) {
				var ret = {
					labels: timeGen(6),
					id: req.id,
					sla: null,
					slo: null
				},
					sl = req.id.indexOf('sl-') === 0 ? true : false,
					team = angular.lowercase(req.team);
				//series = series ? series.toLowerCase() : 'all';
				
				// GET only
				switch (team) {
				case 'customer care':
					ret.series = sl ? [
						'Customer Care SLA',
						'Customer Care SLO',
						'Customer Care Admin SLA',
						'Customer Care Admin SLO'
					] : [
						'Customer Care',
						'Customer Care Admin'
					];
					ret.data = sl ? randGen(200, 250, 6, 4)
									: randGen(200, 250, 6, 2);
					break;
				case 'noc':
					ret.series = sl ? [
						'NOC 1 SLA',
						'NOC 1 SLO',
						'NOC 2 SLA',
						'NOC 2 SLO',
						'WSM Premier SLA',
						'WSM Premier SLO'
					] : [
						'NOC 1',
						'NOC 2',
						'WSM Premier'
					];
					ret.data = sl ? randGen(200, 250, 6, 6)
									: randGen(200, 250, 6, 3);
					break;
				case 'soc':
					
				case 'all':
					
				default:
					ret.series = sl ? [
						'Customer Care SLA',
						'Customer Care SLO',
						'NOC SLA',
						'NOC SLO',
						'SOC SLA',
						'SOC SLO'
					] : [
						'Customer Care',
						'NOC',
						'SOC'
					];
					ret.data = sl ? randGen(200, 250, 6, 6)
									: randGen(200, 250, 6, 3);
				}
				ret = sl ? separateGraphData(ret) : ret;
				ret.totals = {
					total: totalGraphData(ret.data),
					sla: totalGraphData(ret.sla),
					slo: totalGraphData(ret.slo)
				};
				return {graph: ret};
			}
		};
		svc.scorecard = {
			// dynamic scorecard control data
			controls: {
				individual: {
					names: function getIndividualNames() {
						return [
							'Shelton Jenkins',
							'Samuel King',
							'Josh Gardner',
							'Matthew Moreno',
							'Suzanne Thompson'
						];
					},
					times: function getIndividualTimes(name) {
						return name ? [
							'Weekly',
							'Monthly'
						] : null;
					}
				},
				team: {
					names: function getTeamNames() {
						return [
							'Customer Care',
							'NOC',
							'SOC'
						];
					},
					times: function getTeamTimes(name) {
						return name ? [
							'Weekly',
							'Monthly'
						] : null;
					}
				},
				department: {
					names: function getDepartmentNames() {
						return [
							'Customer Care',
							'NOC',
							'SOC',
							'TOC',
							'WSM'
						];
					},
					times: function getDepartmentTimes(name) {
						return name ? [
							'Weekly',
							'Monthly'
						] : null;
					}
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
	dataService.$inject = ['$http', '$q', '$timeout'];
	/* add service */
	angular.module('alccDash')
		.factory('data', dataService);
}(angular));
