'use strict';

angular.module('r2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test.getChannelInfo', {
        url: '/getChannelInfo',
        templateUrl: 'app/getChannelInfo/getChannelInfo.html',
        controller: 'GetchannelinfoCtrl',
        controllerAs: 'vm'
      });
  });
