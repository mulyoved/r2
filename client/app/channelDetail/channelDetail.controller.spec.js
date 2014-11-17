'use strict';

describe('Controller: ChanneldetailCtrl', function () {

  // load the controller's module
  beforeEach(module('r2App'));

  var ChanneldetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChanneldetailCtrl = $controller('ChanneldetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
