/*global angular, fish */
(function () {
	"use strict";
	angular.module('dashboard', [])

		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/dashboard', {
				templateUrl: fish.tplPath + 'dashboard/dashboard.html',
				controller: 'DashboardCtrl'
			});
		}])

		.controller('DashboardCtrl', ['$scope', '$location', function ($scope, $location) {
			$scope.page.section = 'dashboard';
		}]);
}());