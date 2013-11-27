/*global angular, fish */
(function () {
	"use strict";
	angular.module('payments')
		.factory('PaymentService', ['Restangular', function (Restangular) {

			var _getPayments = function () {
					return Restangular.all('payment').getList();
				},
				_create = function (paymentData) {
					return Restangular.all('payment').post(paymentData);
				};

			return {
				getPayments: _getPayments,
				create: _create
			};
		}]);
}());