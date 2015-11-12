(function (angular, undefined) {
	'use strict';
	/* create controller */
	function ScorecardsController($routeParams, data) {
		var ctrl = this,
			cardType = $routeParams.type,
			table,
			controls,
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
			},
			updateTableData = function updateTableData(data) {
				ctrl.table = data;
			},
			buildTableData = function buildTableData() {
				table.footer.results = calculateTotals(table.rows);
			},
			getScorecard = function getScorecard() {
				table = data.scorecard[cardType].read(
					ctrl.controls.autosuggest.nameText,
					ctrl.controls.timeOption
				);
				buildTableData();
				updateTableData(table);
			};
		// build control data
		controls = data.scorecard.controls[cardType]();
		controls.timeOption = '';
		controls.autosuggest = {
			id: 'scorecardName',
			placeholder: cardType,
			nameText: '',
			names: controls.names
		};
		
		// build header data
		
		
		// build our table with initial fake data
		table = data.scorecard[cardType].read('name', 'weekly');
		buildTableData();
		
		// assign properties and methods to controller
		ctrl.cardType = cardType;
		ctrl.controls = controls;
		ctrl.table = table;
		ctrl.getScorecard = getScorecard;
		//console.log('ScorecardsController', ctrl);
	}
	/* add controller */
	angular.module('alccDash')
		.controller('scorecards', ScorecardsController);
}(angular));
