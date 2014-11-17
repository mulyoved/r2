(function() {
  'use strict';

  angular
    .module('r2App')
    .controller('GetchannelinfoCtrl', GetchannelinfoCtrl);

  GetchannelinfoCtrl.$inject = ['$log', 'Restangular'];

  function GetchannelinfoCtrl($log, Restangular) {

    /*jshint validthis: true */
    var vm = this;

    vm.answer = '';
    vm.formatData = '';

    vm.data = {
      channelId: 'UClEQqLc5V_j1wg1Ro8Hcrow'
    };

    var buildUrl = function(type, id) {
      return {
        url: 'https://www.youtube.com/' + type + id,
        text: id
      }
    };

    var buildFreebaseUrl = function(id) {
      return {
        url: 'https://www.freebase.com' + id,
        text: id
      }
    };

    var buildChannelUrl = function(id) {
      return buildUrl('channel/', id);
    };

    var map = function(fn, array) {
      var res = [];
      angular.forEach(array, function(item) {
        res.push(fn(item));
      });

      return res;
    };

    var formatAnswer = function(answer) {
      var format = {
        _id: answer._id,
        channelId: buildUrl('channel/', answer.channelId),
        title: answer.title,
        description: answer.description,
        publishedAt: answer.publishedAt,
        thumbnails: answer.thumbnails,
        googlePlusUserId: answer.googlePlusUserId,
        viewCount: answer.viewCount,
        subscriberCount: answer.subscriberCount,
        videoCount: answer.videoCount,
        brand_title: answer.brand_title,
        brand_keywords: answer.brand_keywords,
        image: answer.image,
        mobile_image: answer.mobile_image,
        topic: map(buildFreebaseUrl, answer.topic),
        featuredChannels: map(buildChannelUrl, answer.featuredChannels)
      };

      format.relatedPlaylists = {};
      angular.forEach(answer.relatedPlaylists, function(item) {
        format.relatedPlaylists[item.name] = buildUrl('playlist?list=', item.url);
      });

      return format;
    };

    vm.getChannelInfo = function() {
      var id = vm.data.channelId;
      $log.log('getChannelInfo', id);
      Restangular.one('testYoutubes').one('get', id).get().then(function(answer) {
        $log.log('getChannelInfo Answer', answer);
        vm.format = formatAnswer(answer);
        vm.answer = JSON.stringify(answer,null,"  ");
      }, function(err) {
        $log.error('Error', err);
      });
    };

    vm.getFromDB = function() {
      var id = '5460d95fcadb6268308af3b5';
      $log.log('getFromDB', id);
      Restangular.one('channels', id).get().then(function(answer) {
        $log.log('getFromDB Answer', answer);
        vm.format = formatAnswer(answer);
        vm.answer = JSON.stringify(answer,null,"  ");
      }, function(err) {
        $log.error('Error', err);
      });
    }
  }
})();
