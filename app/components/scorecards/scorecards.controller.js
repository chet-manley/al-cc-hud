(function (angular, undefined) {
	'use strict';
	/* create controller */
	function ScorecardsController($routeParams, data) {
		var ctrl = this,
			scorecard = data.scorecard(),
			table = {},
			optUpdate = function optUpdate(opt) {
				if (opt === 'One Month') {
					table.headers = scorecard.headers.month;
				} else {
					table.headers = scorecard.headers.week;
				}
			};
		console.log($routeParams);
		
		// build table data
		table.headers = scorecard.headers.week;
		table.rows = scorecard.rows;
		
		// assign properties and methods to controller
		ctrl.cardType = $routeParams.type;
		ctrl.timeOptions = scorecard.options;
		ctrl.optUpdate = optUpdate;
		ctrl.table = table;
	}
	/* add controller */
	angular.module('alccDash')
		.controller('scorecards', ScorecardsController);
}(angular));
