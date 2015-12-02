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
				// results
				for (i = 0; i < len; i = i + 1) {
					column = 0;
					rows.forEach(function (row) {
						column += row.results[i] * (row.weight / 100);
					});
					totals.results.push(Number(column.toFixed(1)));
				}
				// goals
				column = {
					standard: 0,
					high: 0,
					low: 0
				};
				rows.forEach(function (row) {
					column.standard += row.goals.standard * (row.weight / 100);
					column.high += row.goals.high * (row.weight / 100);
					column.low += row.goals.low * (row.weight / 100);
				});
				// Explicitly coerce to number
				column.standard = Number(column.standard.toFixed(1));
				column.high = Number(column.high.toFixed(1));
				column.low = Number(column.low.toFixed(1));
				totals.goals = column;
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
				table.footer = {
					results: totals.results,
					goals: totals.goals
				};
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
