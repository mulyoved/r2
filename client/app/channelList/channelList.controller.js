(function() {
  'use strict';

  angular
    .module('r2App')
    .controller('ChannellistCtrl', ChannellistCtrl);

  ChannellistCtrl.$inject = ['$scope', '$log', 'Restangular', '$interval', '$location', 'dbChannel', 'SweetAlert'];

  function ChannellistCtrl($scope, $log, Restangular, $interval, $location, dbChannel, SweetAlert) {
    /*jshint validthis: true */
    var vm = this;

    vm.queryData = dbChannel.queryData;

    vm.gridOptions = {
      enableRowSelection: true,
      enableRowHeaderSelection: false
    };

    vm.gridOptions.columnDefs = [
      { name: 'title', displayName: 'Title' },
      { name: 'description', displayName: 'Description'},
      { name: 'subscriberCount', displayName: 'Subscribers'},
      { name: 'viewCount', displayName: 'View Count' },
      { name: 'thumbnails',
        displayName: 'Thumbnail',
        //cellTemplate: '"<img height=\"30px\" width=\"50px\" max-height=\"30px\" max-width=\"50px\" ng-src=\"{{row.getProperty(\'thumbnail\')}}\" >'
        //cellTemplate: '<img ng-src=\"{{row.getProperty(\'thumbnails\')}}\"></img>'
        //cellTemplate: '<div>{{vm.getRow()}}</div>'
        //{{row.getProperty("thumbnails")}}
        //cellTemplate: '<button class="btn primary" ng-click="getExternalScopes().showMe(row.entity.thumbnails)">Click Me</button>'
        cellTemplate: '<img class=\"grid-thumbnails\" ng-src="{{row.entity.thumbnails}}"></img>'
      },
    ];

    vm.showMe = function(row){
      $log.log('alert(this.someProp)', row);
    };

    vm.getRow = function() {
      $log.log('Get Row');
    };

    vm.gridOptions.multiSelect = false;
    vm.gridOptions.modifierKeysToMultiSelect = false;
    vm.gridOptions.noUnselect = true;
    vm.gridOptions.infiniteScrollPercentage = 15;

    vm.gridOptions.onRegisterApi = function( gridApi ) {
      vm.gridApi = gridApi;

      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        var msg = 'row selected ' + row.isSelected;
        $log.log(msg, row.entity.title, row.entity._id, '/test/channelDetail/' + row.entity._id);
        $location.path('/test/channelDetail/' + row.entity._id);
      });

      /*
      gridApi.infiniteScroll.on.needLoadMoreData($scope,function() {
        dbChannel.getChannels(vm.page).then(function(answer) {
          //vm.gridOptions.data = convertData(answer);
          vm.page += 1;
          gridApi.infiniteScroll.dataLoaded();
        })
          .error(function() {
            gridApi.infiniteScroll.dataLoaded();
          });
        gridApi.infiniteScroll.dataLoaded();
      });
      */

      /*
      gridApi.selection.on.rowSelectionChangedBatch(vm,function(rows){
        var msg = 'rows changed ' + rows.length;
        $log.log(msg);
      });
      */
    };
    vm.gridOptions.data = [];

    var convertChannels = function(data) {
      var res = [];
      angular.forEach(data, function(item) {
        res.push(convertChannel(item));
      });

      return res;
    };

    function convertChannel(item) {
      return {
        _id: item._id,
        title: item.title,
        description: item.description,
        subscriberCount: item.subscriberCount,
        viewCount: item.viewCount,
        thumbnails: item.thumbnails
      }
    }

    var getData = function() {
      dbChannel.getChannels().then(function(answer) {
        vm.gridOptions.data = convertChannels(answer);
        /*
        $log.log(answer.length);
        angular.forEach(answer, function(item) {
          vm.gridOptions.data.push(convertChannel(item));
        });
        */

        /*
        $interval( function() {
          vm.gridApi.selection.selectRow(vm.gridOptions.data[0]);
        }, 0, 1);
        */
      }, function(err) {
        $log.error('Error', err);
      })
    };

    vm.doSearch = function() {
      dbChannel.applySearch();
      $log.log('Search Term: ', dbChannel.queryData);
      getData();
    };

    vm.addChannel = function() {
      //Steps
      //Search for channel
      //Confirm (Show Icon)
      // - Add and add related channels
      //Add to database + crawler

      var channelId = vm.queryData.typedSearchText;
      dbChannel.getChannelByChannelId(channelId).then(function(channel) {
        SweetAlert.swal({
          title: 'Already Exists',
          text: 'Channel "' + channelId + '" already in database',
          imageUrl: channel.thumbnails,
        });
      }, function(err) {
        dbChannel.searchChannel(channelId).then(function (channel) {
          SweetAlert.swal({
              title: channel.title,
              text: 'Add channel ' + channel.title + '?',
              imageUrl: channel.thumbnails,
              showCancelButton: true,
              type: 'success'
            },
            function () {
              //Add the channel
              dbChannel.addChannel(channelId).then(function (answer) {
                SweetAlert.swal({
                  title: 'Added',
                  text: 'Channel "' + channel.title + '" was added to database\nMay take few minutes until the information will be available',
                  type: 'success'
                });
              }, function (err) {
                SweetAlert.swal({
                  title: 'Failed',
                  text: 'Failed to add channel "' + channelId + '"\n' + err,
                  type: 'error'
                });

              });
            });
        }, function (err) {
          SweetAlert.swal({
            title: 'Failed',
            text: 'Failed to find channel "' + channelId + '"\n' + err.statusText,
            type: 'error'
          });
        })
      });
    };

    getData();
  }
})();

