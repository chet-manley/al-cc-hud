(function (angular, undefined) {
	'use strict';
	/* create controller */
	function ScorecardsController($routeParams, data) {
		var ctrl = this,
			scorecard = data.scorecard.individual.read(),
			table = {},
			optUpdate = function optUpdate(opt) {
				if (opt === 'Monthly') {
					table.headers = scorecard.headers.month;
				} else {
					table.headers = scorecard.headers.week;
				}
			},
			calculateTotals = function calculateTotals(rows) {
				var i,
					len = rows[0].results.length,
					column,
					totals = [];
				for (i = 0; i < len; i = i + 1) {
					column = 0;
					rows.forEach(function (row) {
						column += row.results[i] * (row.weight / 100);
					});
					totals.push(column.toFixed(1));
				}
				return totals;
			};
		// build table data
		table.headers = scorecard.headers.week;
		table.rows = scorecard.rows;
		table.footer = scorecard.footer;
		table.footer.results = calculateTotals(scorecard.rows);
		
		// assign properties and methods to controller
		ctrl.cardType = $routeParams.type;
		ctrl.timeOptions = scorecard.options;
		ctrl.optUpdate = optUpdate;
		ctrl.table = table;
		console.log('ScorecardsController', ctrl);
	}
	/* add controller */
	angular.module('alccDash')
		.controller('scorecards', ScorecardsController);
}(angular));
