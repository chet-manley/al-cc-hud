(function (angular, undefined) {
	'use strict';
	/* create directive */
	function autosuggestInput() {
		var getScorecard = function getScorecard() {
				//console.log('Performing search for: ');
			},
			Controller = function Controller(data) {
				var ctrl = this,
					resetSuggestions = function resetSuggestions() {
						ctrl.suggestions = [];
						ctrl.selectedIndex = -1;
						return false;
					},
					findSuggestions = function findSuggestions() {
						// empty input
						if (!ctrl.asData.nameText) {return resetSuggestions(); }
						var text = ctrl.asData.nameText.toLowerCase(),
							list = ctrl.asData.names,
							len = list.length,
							i = 0,
							maxSuggestions = 5;
						resetSuggestions();
						
						while (i < len && ctrl.suggestions.length < maxSuggestions) {
							if (list[i].toLowerCase().indexOf(text) !== -1) {
								ctrl.suggestions.push(list[i]);
							}
							i = i + 1;
						}
					},
					selectSuggestion = function selectSuggestion(i) {
						ctrl.asData.nameText = ctrl.suggestions[i];
						return resetSuggestions();
					},
					checkKeyDown = function checkKeyDown(event) {
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
							resetSuggestions();
						}
					};
				
				ctrl.suggestions = [];
				ctrl.selectedIndex = -1;
				ctrl.findSuggestions = findSuggestions;
				ctrl.selectSuggestion = selectSuggestion;
				ctrl.checkKeyDown = checkKeyDown;
				
				console.log(ctrl);
			};
		Controller.$inject = ['data'];
		
		return {
			restrict: 'AE',
			templateUrl: 'app/shared/autosuggestInput.htm',
			scope: {},
			bindToController: {
				'asData': '='
			},
			controller: Controller,
			controllerAs: 'autosuggestCtrl'
		};
	}
	/* add directive */
	angular.module('alccDash')
		.directive('autosuggestInput', autosuggestInput);
}(angular));
