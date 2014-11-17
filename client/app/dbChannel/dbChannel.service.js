'use strict';

angular.module('r2App')
  .factory('dbChannel', ['$q', 'Restangular', '$log', function ($q, Restangular, $log) {
    // Service logic
    // ...

    var cachedChannels = {};
    var queryData = {
      typedSearchText: '',
      searchText: '',
      page: 1,
      pageSize: 20
    };

    // Public API here
    return {
      queryData: queryData,
      applySearch: function() {
        queryData.searchText = queryData.typedSearchText;
      },
      getChannels: function (page, searchText) {
        var deferred = $q.defer();
        Restangular.all('channels').getList({
          limit: queryData.pageSize,
          page: queryData.page,
          searchText: queryData.searchText
        }).then(function(answer) {
          cachedChannels = {};
          angular.forEach(answer, function(item) {
            cachedChannels[item._id] = item;
          });

          deferred.resolve(answer);
        }, function(err) {
          $log.error('Error', err);
          deferred.reject(err);
        });

        return deferred.promise;
      },

      getChannel: function (id) {
        var deferred = $q.defer();
        if (cachedChannels[id]) {
          deferred.resolve(cachedChannels[id]);
        }
        else {
          Restangular.one('channels',id).get().then(function(answer) {
            deferred.resolve(answer);
          }, function(err) {
            $log.error('Error', err);
            deferred.reject(err);
          });
        }

        return deferred.promise;
      },

      getChannelByChannelId: function (channelId) {
          return Restangular.one('channels').one('channelId',channelId).get();
      },

      deleteChannel: function(channel) {
        return channel.remove();
      },


      //Search in YouTube
      searchChannel: function(channelId) {
        return Restangular.one('services').one('search',channelId).get();
      },

      //Add to database
      addChannel: function(channelId) {
        return Restangular.one('services').one('add',channelId).get();
      },
    };
  }]);
