(function (angular, undefined) {
	'use strict';
	/* create controller */
	function ScorecardsController($routeParams, $timeout, data) {
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
			createFilterFor = function createFilterFor(query) {
				query = angular.lowercase(query);
				return function filterFn(name) {
					// check === "0" to search only from beginning of string
					return (name.value.indexOf(query) !== -1);
				};
			},
			getNames = function getNames() {
				var names = data.scorecard
						.controls[cardType]
						.names();
				names.forEach(function (v, i, a) {
					a[i] = {
						value: v.toLowerCase(),
						display: v
					};
				});
				return names;
			},
			getTimes = function getTimes() {
				return $timeout(function () {
					ctrl.controls.times = data.scorecard
						.controls[cardType]
						.times(ctrl.controls.name.selected.value);
				}, 1000);
			},
			getScorecard = function getScorecard(name, time) {
				// cache scorecard
				scorecard = data.scorecard[cardType].read(name, time);
				return scorecard;
			},
			updateHeader = function updateHeader(text) {
				var header = scorecard.metadata || {};
				header = header.name + '\'s ' + header.timeframe + ' Report';
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
			findScorecard = function findScorecard(name, time) {
				name = name || ctrl.controls.name.selected.value;
				time = time || ctrl.controls.time;
				getScorecard(name, time);
				updateTable();
				updateHeader();
			},
			findNames = function findNames(query) {
				return query ? ctrl.controls.names.filter(createFilterFor(query)) : ctrl.controls.names;
			},
			initControlData = function initControlData() {
				ctrl.controls = {
					names: getNames(),
					times: null,
					loadTimes: getTimes,
					name: {
						text: null,
						label: cardType,
						selected: null,
						search: findNames
					},
					time: null,
					action: findScorecard
				};
			},
			init = function init() {
				// initialize control data
				initControlData();
				// assign properties and methods to controller //
				// build header data
				ctrl.header = 'Please select a scorecard to continue';
			};
		
		// this controller auto-inits
		init();
		//console.log('ScorecardsController', ctrl);
	}
	ScorecardsController.$inject = ['$routeParams', '$timeout', 'data'];
	/* add controller */
	angular.module('alccDash')
		.controller('scorecards', ScorecardsController);
}(angular));
