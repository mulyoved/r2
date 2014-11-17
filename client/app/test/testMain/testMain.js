'use strict';

angular.module('r2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test.testMain', {
        url: '/testMain',
        templateUrl: 'app/test/testMain/testMain.html',
        controller: 'TestmainCtrl',
        controllerAs: 'vm'
      });
  });
