/*global angular */
(function () {
	"use strict";
	angular.module('fish', ['ngCookies', 'dashboard', 'payments'])

		.config(['$locationProvider', '$routeProvider', '$interpolateProvider', function($locationProvider, $routeProvider, $interpolateProvider) {
			// Setup interpolation symbols for templates
			$interpolateProvider.startSymbol('[[');
			$interpolateProvider.endSymbol(']]');

			$locationProvider.html5Mode(true);
			$routeProvider.otherwise({ redirectTo: '/dashboard' });
		}])

		.controller('AppCtrl', ['$scope', function ($scope) {
			$scope.fish = window.fish;
			$scope.page = {};
		}]);
}());