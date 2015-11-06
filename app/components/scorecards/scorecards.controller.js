(function (angular, undefined) {
	'use strict';
	// spoof expected data
	var extData = function extData(request) {
		var data = {},
			randGen = function randGen(min, max, interval) {
				var i = 0, ret = [];
				if (typeof interval === 'undefined') {interval = 1; }
				while (i < interval) {
					ret.push(Math.floor(Math.random() * (max - min + 1) + min));
					i++;
				}
				return ret;
			};
		
		if (request === 'options') {
			data.options = [
				'This Week',
				'Two Weeks',
				'Three Weeks',
				'One Month'
			];
		}
		if (request === 'headers.week') {
			data.headers = [
				'Key Performance Indicator',
				'Weight',
				'Goal',
				'Result This Week',
				'Result Week 1',
				'Result Week 2',
				'Result Week 3'
			];
		}
		if (request === 'headers.month') {
			data.headers = [
				'Key Performance Indicator',
				'Weight',
				'Goal',
				'Result This Week',
				'Result Week 1',
				'Result Week 2',
				'Result Week 3'
			];
		}
		if (request === 'rows') {
			data.rows = [
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
			];
		}
		return data;
	};
	
	/* create controller */
	function ScorecardsController($routeParams) {
		var ctrl = this,
			scorecard = {},
			optUpdate = function optUpdate(opt) {
				if (opt === 'One Month') {
					scorecard.headers = extData('headers.month').headers;
				} else {
					scorecard.headers = extData('headers.week').headers;
				}
			};
		ctrl.type = $routeParams.type;
		
		// build scorecard data
		scorecard.options = extData('options').options;
		scorecard.headers = extData('headers.week').headers;
		scorecard.rows = extData('rows').rows;
		
		// assign properties and methods to controller
		ctrl.scorecard = scorecard;
		ctrl.optUpdate = optUpdate;
	}
	/* add controller */
	angular.module('alccDash')
		.controller('scorecards', ScorecardsController);
}(angular));
