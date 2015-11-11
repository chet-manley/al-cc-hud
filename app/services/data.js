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
		svc.dashboard = {
			// GET only
			channels: function channels() {
				return {
					channels: [
						{
							name: 'Customer Care',
							id: '12345'
						},
						{
							name: 'Active Watch',
							id: '23456'
						},
						{
							name: 'NOC Level 1 Case Queue',
							id: '34567'
						},
						{
							name: 'WSM Security Services Case Queue',
							id: '45678'
						}
					]
				};
			},
			chart: function chart(method) {
				// GET
				if (!method || method.toLowerCase() === 'get') {
					return {
						chart: {
							labels: [

							],
							series: [

							],
							data: [

							]
						}
					};
				}
			}
		};
		svc.scorecard = {
			individual: {
				// CRUD
				create: function create() {
					
				}, // END create
				read: function read() {
					return {
						options: [
							'Weekly',
							'Monthly'
						],
						headers: {
							week: [
								'Key Performance Indicator',
								'Weight',
								'Goal',
								'Result Nov. 8-14',
								'Result Nov. 1-7',
								'Result Oct. 25-31',
								'Result Oct. 18-24'
							],
							month: [
								'Key Performance Indicator',
								'Weight',
								'Goal',
								'Result Nov.',
								'Result Oct.',
								'Result Sep.',
								'Result Aug.'
							]
						},
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
								kpi: 'Efficiency',
								weight: 25,
								goals: {
									standard: 0
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
								standard: 90
							}
						}
					};
				}, // END read
				update: function update() {

				}, // END update
				del: function del() {

				} // END delete
			}, // END 'individual' CRUD routes
			team: {
				// CRUD
				create: function create() {
					
				}, // END create
				read: function read() {
					return {
						options: [
							'Weekly',
							'Monthly'
						],
						headers: {
							week: [
								'Key Performance Indicator',
								'Weight',
								'Goal',
								'Result Nov. 8-14',
								'Result Nov. 1-7',
								'Result Oct. 25-31',
								'Result Oct. 18-24'
							],
							month: [
								'Key Performance Indicator',
								'Weight',
								'Goal',
								'Result Nov.',
								'Result Oct.',
								'Result Sep.',
								'Result Aug.'
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
				}, // END read
				update: function update() {

				}, // END update
				del: function del() {

				} // END delete
			}, // END 'team' CRUD routes
			department: {
				// CRUD
				create: function create() {
					
				}, // END create
				read: function read() {
					return {
						options: [
							'Weekly',
							'Monthly'
						],
						headers: {
							week: [
								'Key Performance Indicator',
								'Weight',
								'Goal',
								'Result Nov. 8-14',
								'Result Nov. 1-7',
								'Result Oct. 25-31',
								'Result Oct. 18-24'
							],
							month: [
								'Key Performance Indicator',
								'Weight',
								'Goal',
								'Result Nov.',
								'Result Oct.',
								'Result Sep.',
								'Result Aug.'
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
				}, // END read
				update: function update() {

				}, // END update
				del: function del() {

				} // END delete
			} // END 'department' CRUD routes
		}; // END scorecard routes
		
		return svc;
	}
	
	/* add service */
	angular.module('alccDash')
		.factory('data', dataService);
}(angular));
