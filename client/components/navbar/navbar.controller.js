'use strict';

angular.module('r2App')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
      {
        title: 'Test',
        link: '/test/testMain'
      },
      {
        title: 'ChannelInfo',
        link: '/test/getChannelInfo'
      },
      {
        title: 'Channels',
        link: '/test/channelList'
      }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
