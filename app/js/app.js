'use strict';


// Declare app level module which depends on filters, and services
angular.module('restBrowser', [
  'ngRoute',
  'restBrowser.controllers',
  'millerColumnBrowser',
  'restangular'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
