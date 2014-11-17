'use strict';

describe('Controller: ChannellistCtrl', function () {

  // load the controller's module
  beforeEach(module('r2App'));

  var ChannellistCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChannellistCtrl = $controller('ChannellistCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
