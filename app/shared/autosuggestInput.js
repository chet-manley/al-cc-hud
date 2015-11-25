(function (angular, undefined) {
	'use strict';
	/* create directive */
	function autosuggestInput($timeout) {
		var Controller = function Controller() {
				var ctrl = this,
					resetSuggestions = function resetSuggestions() {
						ctrl.suggestions = [];
						ctrl.selectedIndex = -1;
						return false;
					},
					findSuggestions = function findSuggestions() {
						// empty input
						if (!ctrl.data.nameText) {return resetSuggestions(); }
						var text = ctrl.data.nameText.toLowerCase(),
							list = ctrl.data.names,
							len = list.length,
							i = 0,
							maxSuggestions = 5;
						resetSuggestions();

						while (i < len && ctrl.suggestions.length < maxSuggestions) {
							if (list[i].toLowerCase().indexOf(text) !== -1) {
								ctrl.suggestions.push(list[i]);
							}
							i += 1;
						}
					},
					selectSuggestion = function selectSuggestion(i) {
						if (!ctrl.suggestions[i]) {return resetSuggestions(); }
						ctrl.data.nameText = ctrl.suggestions[i];
						return resetSuggestions();
					},
					hideSuggestions = function hideSuggestions() {
						// timeout required to allow suggestion click before object tear-down
						$timeout(resetSuggestions, 250);
					},
					checkChange = function checkChange(event) {
						if (event.type === 'keydown') {
							// arrow down, increment selectedIndex
							if (event.keyCode === 40) {
								event.preventDefault();
								if (ctrl.selectedIndex + 1 !== ctrl.suggestions.length) {
									ctrl.selectedIndex++;
								}
							// arrow up, decrement selectedIndex
							} else if (event.keyCode === 38) {
								event.preventDefault();
								if (ctrl.selectedIndex - 1 > -1) {
									ctrl.selectedIndex--;
								}
							// enter, empty suggestions array
							} else if (event.keyCode === 13) {
								event.preventDefault();
								selectSuggestion(ctrl.selectedIndex);
							}
						} // END keydown events
					};
				
				ctrl.suggestions = [];
				ctrl.selectedIndex = -1;
				ctrl.findSuggestions = findSuggestions;
				ctrl.selectSuggestion = selectSuggestion;
				ctrl.hideSuggestions = hideSuggestions;
				ctrl.checkChange = checkChange;
			};
		
		return {
			restrict: 'AE',
			templateUrl: 'app/shared/autosuggestInput.htm',
			scope: {},
			bindToController: {
				'data': '=asData'
			},
			controller: Controller,
			controllerAs: 'autosuggestCtrl'
		};
	}
	autosuggestInput.$inject = ['$timeout'];
	/* add directive */
	angular.module('alccDash')
		.directive('autosuggestInput', autosuggestInput);
}(angular));
