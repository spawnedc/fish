/*global angular */
(function () {
	"use strict";
	angular.module('fish', ['ngRoute', 'restangular', 'dashboard', 'payments'])

		.config(['$locationProvider', '$routeProvider', '$interpolateProvider', 'RestangularProvider',
			function($locationProvider, $routeProvider, $interpolateProvider, RestangularProvider) {
			// Setup interpolation symbols for templates
			$interpolateProvider.startSymbol('[[');
			$interpolateProvider.endSymbol(']]');

			// Set the html5 mode on for the urls
			$locationProvider.html5Mode(true);

			// Redirect to dashboard when on root
			$routeProvider.when('/', { redirectTo: '/dashboard' });

			// Restangular configuration
			RestangularProvider.setBaseUrl("/api");
			// trailing slash
			RestangularProvider.setRequestSuffix('/');
			// Access to the original response
			// see: https://github.com/mgonto/restangular#how-can-i-access-the-unrestangularized-element-as-well-as-the-restangularized-one
			RestangularProvider.setResponseExtractor(function(response, operation) {
				// This is a get for a list
				var newResponse;
				if (operation === "getList") {
					// Here we're returning an Array which has one special property metadata with our extra information
					newResponse = response.results;
					newResponse.meta = response.meta;
				} else {
					// This is an element
					newResponse = response;
				}
				return newResponse;
			});
		}])

		.controller('AppCtrl', ['$scope', function ($scope) {
			$scope.fish = window.fish;
			$scope.page = {};
		}]);
}());