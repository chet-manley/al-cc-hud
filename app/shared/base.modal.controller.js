(function (angular, undefined) {
	'use strict';
	/* create controller */
	function BaseModalController($mdDialog) {
		var ctrl = this,
			hide = function hide() {
				$mdDialog.hide();
			},
			cancel = function cancel() {
				$mdDialog.cancel();
			},
			init = function init() {
				// assign properties and methods to controller //
				ctrl.hide = hide;
				ctrl.cancel = cancel;
			};
		// this controller auto-inits
		init();
	}
	BaseModalController.$inject = ['$mdDialog'];
	/* add controller */
	angular.module('alccDash')
		.controller('base.modal', BaseModalController);
}(angular));
