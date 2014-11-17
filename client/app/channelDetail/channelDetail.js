'use strict';

angular.module('r2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test.channelDetail', {
        url: '/channelDetail/:_id',
        templateUrl: 'app/channelDetail/channelDetail.html',
        controller: 'ChanneldetailCtrl',
        controllerAs: 'vm',

        resolve: {
          channelInfo: ['$stateParams', 'Restangular', 'dbChannel', function ($stateParams, Restangular, dbChannel) {
            //return $stateParams._id;
            return dbChannel.getChannel($stateParams._id);
            //return Restangular.one('channels',$stateParams._id).get();
          }]
        }
      });
  });
