(function (angular, undefined) {
	'use strict';
	/* define service */
	function dataService($http, $q) {
		var svc = {},
			// randomly generate numbers
			randGen = function randGen(min, max, interval) {
				var i = 0, ret = [];
				if (typeof interval === 'undefined') {interval = 1; }
				while (i < interval) {
					ret.push(Math.floor(Math.random() * (max - min + 1) + min));
					i++;
				}
				return ret;
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
		svc.scorecard = function scorecard(method) {
			if (!method || method.toLowerCase() === 'get') {
				return {
					options: [
						'This Week',
						'Two Weeks',
						'Three Weeks',
						'One Month'
					],
					headers: {
						week: [
							'Key Performance Indicator',
							'Weight',
							'Goal',
							'Result This Week',
							'Result Week 1',
							'Result Week 2',
							'Result Week 3'
						],
						month: [
							'Key Performance Indicator',
							'Weight',
							'Goal',
							'Result This Month',
							'Result Month 1',
							'Result Month 2',
							'Result Month 3'
						]
					},
					rows: [
						{
							kpi: 'First Touch Resolve',
							weight: 25,
							goal: 90,
							results: randGen(80, 100, 4)
						},
						{
							kpi: 'Case/Call Assessment',
							weight: 15,
							goal: 95,
							results: randGen(90, 100, 4)
						},
						{
							kpi: 'Efficiency',
							weight: 25,
							goal: 0,
							results: randGen(50, 100, 4)
						},
						{
							kpi: 'Agent Satisfaction',
							weight: 15,
							goal: 85,
							results: randGen(75, 100, 4)
						},
						{
							kpi: 'Customer Satisfaction',
							weight: 20,
							goal: 90,
							results: randGen(80, 100, 4)
						}
					]
				};
			}
		}; // END scorecard route
		
		return svc;
	}
	
	/* add service */
	angular.module('alccDash')
		.factory('data', dataService);
}(angular));
