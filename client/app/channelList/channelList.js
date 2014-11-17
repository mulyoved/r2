'use strict';

angular.module('r2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test.channelList', {
        url: '/channelList',
        templateUrl: 'app/channelList/channelList.html',
        controller: 'ChannellistCtrl',
        controllerAs: 'vm'
      });
  });
