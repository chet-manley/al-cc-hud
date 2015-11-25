(function (angular, undefined) {
	'use strict';
	/* define service */
	function modalsService($rootScope, $q) {
		var svc = {},
			modal = {
				deferred: null,
				params: null
			};
		// Return the params associated with the current modal
		svc.params = function params() {
			return modal.params || {};
		};
		svc.open = function open(type, params, pipeResponse) {
			var previousDeferred = modal.deferred;
			// Setup the new modal instance properties.
			modal.deferred = $q.defer();
			modal.params = params;
			// Pipe the new window response into the previous window's deferred value.
			if (previousDeferred && pipeResponse) {
				modal.deferred.promise
					.then(previousDeferred.resolve, previousDeferred.reject);
			// Immediately reject the current window.
			} else if (previousDeferred) {
				previousDeferred.reject();
			}
			// emit event for modals directive to open new modal
			$rootScope.$emit("modals.open", type);
			return modal.deferred.promise;
		};
		// convenience method for .open(), enables the pipeResponse flag
		svc.proceedTo = function proceedTo(type, params) {
			return svc.open(type, params, true);
		};
		// reject the current modal
		svc.reject = function reject(reason) {
			if (!modal.deferred) {return; }
			modal.deferred.reject(reason);
			modal.deferred = modal.params = null;
			// emit event for modals directive to close active modal
			$rootScope.$emit("modals.close");
		};
		// resolve the current modal
		svc.reslove = function resolve(response) {
			if (!modal.deferred) {return; }
			modal.deferred.resolve(response);
			modal.deferred = modal.params = null;
			// emit event for modals directive to close active modal
			$rootScope.$emit("modals.close");
		};
		
		return svc;
	}
	modalsService.$inject = ['$rootScope', '$q'];
	/* add service */
	angular.module('alccDash')
		.service('modals', modalsService);
}(angular));
