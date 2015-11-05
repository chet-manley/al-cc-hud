(function (angular, undefined) {
	'use strict';
	/* spoof expected data */
	var extData = function extData() {
		var randGen = function randGen(min, max, interval) {
			var i = 0, ret = [];
			if (typeof interval === 'undefined') {interval = 1; }
			while (i < interval) {
				ret.push(Math.floor(Math.random() * (max - min + 1) + min));
				i++;
			}
			return ret;
		},
			data = [
				{
					kpi: 'First Touch Resolve',
					weight: '25%',
					goal: '90%',
					results: randGen(80, 100, 4)
				},
				{
					kpi: 'Case/Call Assessment',
					weight: '15%',
					goal: '95%',
					results: randGen(90, 100, 4)
				},
				{
					kpi: 'Efficiency',
					weight: '25%',
					goal: '',
					results: randGen(50, 100, 4)
				},
				{
					kpi: 'Agent Satisfaction',
					weight: '15%',
					goal: '85%',
					results: randGen(75, 100, 4)
				},
				{
					kpi: 'Customer Satisfaction',
					weight: '20%',
					goal: '90%',
					results: randGen(80, 100, 4)
				}
			];
		return data;
	};
	
	function ScorecardsController($routeParams) {
		var ctrl = this;
		ctrl.scorecard = extData();
		ctrl.header = $routeParams.type;
	}
	/* create our app module */
	angular.module('alccDash')
		.controller('scorecards', ScorecardsController);
}(angular));
