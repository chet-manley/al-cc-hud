(function (angular, undefined) {
	'use strict';
	/* define service */
	function graphsService(data) {
		var svc = {};
		
		return svc;
	}
	graphsService.$inject = ['data'];
	/* add service */
	angular.module('alccDash')
		.factory('graphs', graphsService);
}(angular));
