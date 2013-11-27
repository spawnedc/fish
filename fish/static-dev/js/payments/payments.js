/*global angular, fish */
(function () {
	"use strict";
	angular.module('payments', [])

		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/payments', {
					templateUrl: fish.tplPath + 'payments/payments.html',
					controller: 'PaymentListCtrl'
				})
				.when('/payments/create', {
					templateUrl: fish.tplPath + 'payments/create.html',
					controller: 'PaymentCreateCtrl'
				});
		}])

		.controller('PaymentListCtrl', ['$scope', 'PaymentService', function ($scope, PaymentService) {
			$scope.page.section = 'payments';
			$scope.page.title = 'Payments';
			var paymentPromise = PaymentService.getPayments();

			paymentPromise.then(function (payments) {
				$scope.payments = payments;
			});
		}])

		.controller('PaymentCreateCtrl', ['$scope', 'PaymentService', function ($scope, PaymentService) {
			$scope.page.section = 'payments';
			$scope.page.title = 'Create new payment';
			$scope.payment = {};

			$scope.createPayment = function () {
				var paymentPromise = PaymentService.create($scope.payment);

				paymentPromise.then(function (response) {
					console.warn(response);
				});
			};
		}]);
}());