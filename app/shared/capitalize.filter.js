(function (angular, undefined) {
	'use strict';
	/* create filter */
	function capitalizeFilter() {
		var filter = function filter(input, all) {
			var reg = (all) ? /(?:^|\s)\S/g : /(?:^|\s)\S/;
			return (!!input) ? input.replace(reg, function (txt) {
				return txt.toUpperCase();
			}) : '';
		};
		return filter;
	}
	/* add filter */
	angular.module('alccDash')
		.filter('capitalize', capitalizeFilter);
}(angular));
