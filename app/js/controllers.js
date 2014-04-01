'use strict';

/* Controllers */

angular.module('restBrowser.controllers', [])
  .controller('MyCtrl1', ['$scope', 'Restangular', function($scope, Restangular) {
	  $scope.itemSelected = function(item) {
	      console.log(item.attr('id'));
		  var listing = Restangular.all(item.attr('id')).getList();
		  return listing;
	  };
  }]);
