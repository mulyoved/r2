(function() {
  'use strict';

  angular
    .module('r2App')
    .controller('ChanneldetailCtrl', ChanneldetailCtrl);

  ChanneldetailCtrl.$inject = ['$scope', '$log', 'Restangular', '$interval', 'channelInfo', 'dbChannel', 'messageCenterService', 'SweetAlert'];

  function ChanneldetailCtrl($scope, $log, Restangular, $interval, channelInfo, dbChannel, messageCenterService, SweetAlert) {
    /*jshint validthis: true */
    var vm = this;
    vm.channelInfo = channelInfo;

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

    vm.format = formatAnswer(channelInfo);

    vm.deleteChannel = function() {
      SweetAlert.swal({
          title: '"Are you sure?',
          text: 'Are you sure you want to delete channel: "' + channelInfo.title + '"',
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!"
        },
        function () {
          dbChannel.deleteChannel(channelInfo).then(function(answer) {
            SweetAlert.swal({
              title: 'Deleted',
              text: 'Channel "' + channelInfo.title + '" Deleted!',
              type: "success"
            });
            $log.log('Deleted', channelInfo.title);
          }, function(err) {
            SweetAlert.swal({
              title: 'Failed',
              text: 'Failed to delete channel "' + channelInfo.title + '"\n'+err,
              type: "error"
            });
            $log.error(err);
          });
        });


      /*
      $log.log('Delete Channel', channelInfo);
      dbChannel.deleteChannel(channelInfo).then(function(answer) {
        messageCenterService.add('danger', 'Channel [' + channelInfo.title + '] deleted!', { status: messageCenterService.status.shown });
        $log.log('Deleted');
      }, function(err) {
        $log.error(err);
      })
      */
    };
  }
})();

