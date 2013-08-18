/*global angular */
(function () {
	"use strict";
	angular.module('payments', [])

		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/payments', {
				templateUrl: fish.tplPath + 'payments/payments.html',
				controller: 'PaymentsCtrl'
			});
		}])

		.controller('PaymentsCtrl', ['$scope', '$location', function ($scope, $location) {
			$scope.page.section = 'payments';
		}]);
}());