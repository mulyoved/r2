(function() {
  'use strict';

  angular
    .module('r2App')
    .controller('TestmainCtrl', TestmainCtrl);

  TestmainCtrl.$inject = ['$q', '$log', 'Restangular', 'messageCenterService', 'SweetAlert', 'dbChannel'];

  function TestmainCtrl($q, $log, Restangular, messageCenterService, SweetAlert, dbChannel) {

    /*jshint validthis: true */
    var vm = this;
    vm.jsVersion = '0.0.3';
    vm.answer = {};


    vm.queryYouTube = function queryYouTube() {
      $log.log('queryYouTube 1.0.3');
    };

    vm.getChannelInfo = function() {
      var id = 'UClEQqLc5V_j1wg1Ro8Hcrow';
      Restangular.one('testYoutubes').one('get', id).get().then(function(answer) {
        $log.log(answer);
        vm.answer = JSON.stringify(answer,null,"  ");
      }, function(err) {
        $log.error(err);
      });
    };

    vm.getChannelInfoFromDB = function() {
      var id = '545fd96cf3a65cf422057e75';
      Restangular.one('channels', id).get().then(function(answer) {
        $log.log(answer);
        vm.answer = JSON.stringify(answer,null,"  ");
      }, function(err) {
        $log.error(err);
      });
    };

    vm.crawler = function() {
      $log.log('Start crawler');
    };

    vm.testQueue = function() {
      $log.log('Test Queue');
    };

    vm.testMessageCenter = function() {
      $log.log('messageCenterService');
      messageCenterService.add('success', 'a toast message...', { status: messageCenterService.status.shown });
    };

    vm.testSweetAlert = function() {
      SweetAlert.swal({
          title: "Are you sure?",
          text: "Your will not be able to recover this imaginary file!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!"
        },
        function () {
          SweetAlert.swal("Booyah!");
        });
    };

    vm.dumpJson = function() {
      dbChannel.getChannels(1).then(function(answer) {
        vm.answer = JSON.stringify(answer,null,"  ");
      }, function(err) {
        $log.error(err);
      });
    };

  }
})();
