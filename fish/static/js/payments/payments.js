/*global angular, fish */
(function () {
	"use strict";
	angular.module('payments', [])

		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/payments', {
				templateUrl: fish.tplPath + 'payments/payments.html',
				controller: 'PaymentsCtrl'
			});
		}])

		.controller('PaymentsCtrl', ['$scope', 'PaymentService', function ($scope, PaymentService) {
			$scope.page.section = 'payments';
			var paymentPromise = PaymentService.getPayments();

			paymentPromise.then(function (payments) {
				$scope.payments = payments;
			});
		}]);
}());