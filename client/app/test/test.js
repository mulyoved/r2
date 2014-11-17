'use strict';

angular.module('r2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test', {
        url: '/test',
        abstract: true,
        templateUrl: 'app/test/test.html',
        controller: 'TestCtrl'
      });
  });
