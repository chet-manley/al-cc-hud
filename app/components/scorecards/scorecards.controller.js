(function (angular, undefined) {
	'use strict';
	/* create controller */
	function ScorecardsController($routeParams, data) {
		var ctrl = this,
			cardType = $routeParams.type,
			scorecard,
			calculateTotals = function calculateTotals(rows) {
				var i,
					len = rows[0].results.length,
					column,
					totals = {goals: {}, results: []};
				for (i = 0; i < len; i = i + 1) {
					// results
					column = 0;
					rows.forEach(function (row) {
						column += row.results[i] * (row.weight / 100);
					});
					totals.results.push(Number(column.toFixed(1)));
					// goals
					if (i + 1 === len) {
						column = 0;
						rows.forEach(function (row) {
							column += row.goals.standard * (row.weight / 100);
						});
						// Explicitly coerce to number
						column = Number(column.toFixed(1));
						totals.goals = {
							standard: column,
							high: column + 5,
							low: column - 5
						};
					}
				}
				return totals;
			},
			getScorecard = function getScorecard(name, time) {
				// cache scorecard
				scorecard = data.scorecard[cardType].read(name, time);
				return scorecard;
			},
			updateHeader = function updateHeader(text) {
				var header = scorecard.metadata || {};
				header = header.name + ' ' + header.timeframe + ' Report';
				ctrl.header = text || header;
			},
			updateTable = function updateTable() {
				var table = scorecard.scorecard,
					totals = calculateTotals(table.rows);
				table.footer.results = totals.results;
				table.footer.goals = totals.goals;
				console.log(table.footer);
				ctrl.table = table;
			},
			doQuery = function doQuery(name, time) {
				name = name || ctrl.controls.autosuggest.nameText;
				time = time || ctrl.controls.timeOption;
				getScorecard(name, time);
				updateTable();
				updateHeader();
			},
			getControls = function getControls() {
				var controls = data.scorecard.controls[cardType]();
				return {
					times: controls.times,
					timeOption: '',
					autosuggest: {
						id: 'scorecardName',
						placeholder: cardType,
						nameText: '',
						names: controls.names
					},
					action: doQuery
				};
			},
			init = function init() {
				// assign properties and methods to controller //
				ctrl.cardType = cardType;
				// get control data
				ctrl.controls = getControls();
				// build header data
				ctrl.header = 'Please select a scorecard to continue';
				// build our table with initial fake data
				//doQuery(cardType, 'weekly');
			};
		
		// this controller auto-inits
		init();
		//console.log('ScorecardsController', ctrl);
	}
	ScorecardsController.$inject = ['$routeParams', 'data'];
	/* add controller */
	angular.module('alccDash')
		.controller('scorecards', ScorecardsController);
}(angular));
