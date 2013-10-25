/*global angular, fish */
(function () {
	"use strict";
	angular.module('payments')
		.factory('PaymentService', ['Restangular', function (Restangular) {

			var _getPayments = function () {
					return Restangular.all('payment').getList();
				};

			return {
				getPayments: _getPayments
			}
		}])
}());